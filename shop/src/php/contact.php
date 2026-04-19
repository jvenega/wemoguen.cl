<?php

/* =========================
   CORS + HEADERS
========================= */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

/* =========================
   CONFIG
========================= */

$DESTINO = "juanvenegasfuenzalida@gmail.com";
$FROM_EMAIL = "juanvenegasfuenzalida@gmail.com";

/* =========================
   LIMITES
========================= */

$MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
$ALLOWED_TYPES = [
    "image/jpeg",
    "image/png",
    "application/pdf"
];

/* =========================
   VALIDAR MÉTODO
========================= */

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["ok" => false, "error" => "Método no permitido"]);
    exit;
}

/* =========================
   SANITIZAR
========================= */

function clean($v) {
    return htmlspecialchars(trim($v ?? ''), ENT_QUOTES, 'UTF-8');
}

/* =========================
   DATOS
========================= */

$nombre = clean($_POST["fullName"] ?? '');
$email  = clean($_POST["email"] ?? '');

if (!$nombre || !$email) {
    http_response_code(422);
    echo json_encode(["ok" => false, "error" => "Faltan datos obligatorios"]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(["ok" => false, "error" => "Email inválido"]);
    exit;
}

/* =========================
   VALIDAR ARCHIVOS
========================= */

$attachments = [];

foreach ($_FILES as $key => $file) {

    if ($file["error"] !== 0) continue;

    // Tamaño
    if ($file["size"] > $MAX_FILE_SIZE) {
        http_response_code(422);
        echo json_encode([
            "ok" => false,
            "error" => "Archivo demasiado grande (máx 5MB): " . $file["name"]
        ]);
        exit;
    }

    // Tipo MIME
    if (!in_array($file["type"], $ALLOWED_TYPES)) {
        http_response_code(422);
        echo json_encode([
            "ok" => false,
            "error" => "Tipo de archivo no permitido: " . $file["name"]
        ]);
        exit;
    }

    // Renombrar (PRO)
    $safeName = preg_replace("/[^a-zA-Z0-9_\-]/", "_", $key);
    $ext = pathinfo($file["name"], PATHINFO_EXTENSION);
    $finalName = $safeName . "." . $ext;

    $attachments[] = [
        "tmp_name" => $file["tmp_name"],
        "name" => $finalName,
        "type" => $file["type"]
    ];
}

/* =========================
   EMAIL BASE
========================= */

$subject = "Documentación enviada - WE-MOGÜEN";

$body = "
<h2>Documentos enviados</h2>
<p><strong>Nombre:</strong> $nombre</p>
<p><strong>Email:</strong> $email</p>
<hr>
<p>Se adjuntan documentos.</p>
";

/* =========================
   CREAR EMAIL MULTIPART
========================= */

$boundary = md5(time());

$headers = "MIME-Version: 1.0\r\n";
$headers .= "From: WE-MOGÜEN <$FROM_EMAIL>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

$message = "--$boundary\r\n";
$message .= "Content-Type: text/html; charset=UTF-8\r\n\r\n";
$message .= $body . "\r\n";

/* =========================
   ADJUNTAR ARCHIVOS
========================= */

foreach ($attachments as $file) {

    $content = chunk_split(
        base64_encode(file_get_contents($file["tmp_name"]))
    );

    $message .= "--$boundary\r\n";
    $message .= "Content-Type: {$file["type"]}; name=\"{$file["name"]}\"\r\n";
    $message .= "Content-Transfer-Encoding: base64\r\n";
    $message .= "Content-Disposition: attachment; filename=\"{$file["name"]}\"\r\n\r\n";
    $message .= $content . "\r\n";
}

$message .= "--$boundary--";

/* =========================
   ENVIAR
========================= */

$sent = mail($DESTINO, $subject, $message, $headers, "-f $FROM_EMAIL");

/* =========================
   RESPUESTA
========================= */

if ($sent) {
    echo json_encode(["ok" => true]);
} else {
    http_response_code(500);
    echo json_encode(["ok" => false, "error" => "Error al enviar"]);
}