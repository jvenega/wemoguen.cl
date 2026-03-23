  <?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

/* =====================================
   CONFIGURACIÓN
===================================== */

$ALLOWED_ORIGINS = [
  'https://wemoguen.cl',
  'https://www.wemoguen.cl'
];

$DESTINO = 'info@wemoguen.cl';


/* =====================================
   CORS
===================================== */

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if ($origin && in_array($origin, $ALLOWED_ORIGINS, true)) {
  header("Access-Control-Allow-Origin: $origin");
  header("Vary: Origin");
  header("Access-Control-Allow-Methods: POST, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type");
} elseif ($origin) {
  http_response_code(403);
  echo json_encode(['ok' => false, 'error' => 'Origen no permitido']);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Método no permitido']);
  exit;
}


/* =====================================
   RATE LIMIT (10 req / 10 min)
===================================== */

function rateLimit(string $key, int $limit, int $window): bool {
  $file = sys_get_temp_dir() . '/rl_' . sha1($key) . '.json';
  $now = time();

  $data = ['count' => 0, 'reset' => $now + $window];

  if (file_exists($file)) {
    $content = file_get_contents($file);
    $decoded = json_decode($content ?: '', true);
    if (is_array($decoded)) {
      $data = $decoded;
    }
  }

  if ($now > $data['reset']) {
    $data = ['count' => 0, 'reset' => $now + $window];
  }

  $data['count']++;
  file_put_contents($file, json_encode($data), LOCK_EX);

  return $data['count'] <= $limit;
}

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

if (!rateLimit("contact_$ip", 10, 600)) {
  http_response_code(429);
  echo json_encode(['ok' => false, 'error' => 'Demasiadas solicitudes']);
  exit;
}


/* =====================================
   LEER JSON
===================================== */

$raw = file_get_contents("php://input");
$data = json_decode($raw ?: '', true);

if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'JSON inválido']);
  exit;
}


/* =====================================
   HONEYPOT (anti-bot)
===================================== */

if (!empty($data['website'])) {
  echo json_encode(['ok' => true]);
  exit;
}


/* =====================================
   VALIDACIÓN
===================================== */

function sanitize(string $v): string {
  return trim(preg_replace('/\s+/', ' ', $v) ?? $v);
}

$nombre   = sanitize($data['nombre'] ?? '');
$email    = sanitize($data['email'] ?? '');
$telefono = sanitize($data['telefono'] ?? '');
$rut      = sanitize($data['rut'] ?? '');
$asunto   = sanitize($data['asunto'] ?? 'otras');
$mensaje  = sanitize($data['mensaje'] ?? '');

if ($nombre === '' || $email === '' || $mensaje === '') {
  http_response_code(422);
  echo json_encode(['ok' => false, 'error' => 'Faltan campos obligatorios']);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(422);
  echo json_encode(['ok' => false, 'error' => 'Email inválido']);
  exit;
}

$asuntosValidos = ['inscripcion','taller','participar','otras'];
if (!in_array($asunto, $asuntosValidos, true)) {
  $asunto = 'otras';
}


/* =====================================
   ESCAPE HTML
===================================== */

function e(string $v): string {
  return htmlspecialchars($v, ENT_QUOTES, 'UTF-8');
}


/* =====================================
   CONSTRUIR CORREO
===================================== */

$subject = "Nuevo contacto desde WE-MOGÜEN";

$body = "
<!DOCTYPE html>
<html>
<head>
<meta charset='UTF-8'>
<style>
body { font-family: Arial; }
table { border-collapse: collapse; width: 100%; }
th, td { padding: 8px; border: 1px solid #ddd; }
th { background: #f2f2f2; text-align: left; }
</style>
</head>
<body>
<h2>Nuevo contacto desde el sitio web</h2>
<table>
<tr><th>Nombre</th><td>".e($nombre)."</td></tr>
<tr><th>Email</th><td>".e($email)."</td></tr>
<tr><th>Teléfono</th><td>".e($telefono)."</td></tr>
<tr><th>RUT</th><td>".e($rut)."</td></tr>
<tr><th>Asunto</th><td>".e($asunto)."</td></tr>
<tr><th>Mensaje</th><td>".nl2br(e($mensaje))."</td></tr>
</table>
</body>
</html>
";


/* =====================================
   HEADERS (IMPORTANTE)
===================================== */

$headers = [];
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-type: text/html; charset=UTF-8";

/*
  MUY IMPORTANTE:
  El From debe ser del dominio del hosting.
  NO uses el email del usuario aquí.
*/
$headers[] = "From: WE-MOGÜEN <no-reply@wemoguen.cl>";
$headers[] = "Reply-To: $email";
$headers[] = "X-Mailer: PHP/" . phpversion();


/* =====================================
   ENVIAR
===================================== */

$sent = mail(
  $DESTINO,
  $subject,
  $body,
  implode("\r\n", $headers)
);

if ($sent) {
  echo json_encode(['ok' => true]);
} else {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'No se pudo enviar el mensaje']);
}