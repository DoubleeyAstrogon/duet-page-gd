<?php
header("Content-Type: application/json");

$file = "achievements.json";

// init
if (!file_exists($file)) {
    file_put_contents($file, json_encode([]));
}

$data = json_decode(file_get_contents($file), true);
if (!$data) $data = [];

if (empty($_GET)) {
    echo json_encode([
        "status" => "error",
        "message" => "invalid params"
    ]);
    exit;
}

//add
if (
    isset($_GET['add']) &&
    $_GET['add'] === "true" &&
    isset($_GET['user_id'])
) {

    $user_id = $_GET['user_id'];

    if (!ctype_digit($user_id)) {
        echo json_encode([
            "status" => "error",
            "message" => "invalid user_id"
        ]);
        exit;
    }

    foreach ($data as $entry) {
        if (
            $entry['user_id'] === $user_id &&
            $entry['achievement'] === "click_1000"
        ) {
            echo json_encode([
                "status" => "exists"
            ]);
            exit;
        }
    }

    $new = [
        "user_id" => $user_id,
        "achievement" => "click_1000",
        "time" => date("Y-m-d H:i:s")
    ];

    $data[] = $new;

    file_put_contents(
        $file,
        json_encode($data, JSON_PRETTY_PRINT)
    );

    echo json_encode([
        "status" => "ok",
        "data" => $new
    ]);
    exit;
}

//get
if (
    isset($_GET['user_id']) &&
    count($_GET) === 1
) {
    $user_id = $_GET['user_id'];
    $result = [];

    foreach ($data as $entry) {
        if ($entry['user_id'] === $user_id) {
            $result[] = $entry;
        }
    }

    if (empty($result)) {
        echo json_encode([
            "status" => "not_found"
        ]);
        exit;
    }

    echo json_encode($result, JSON_PRETTY_PRINT);
    exit;
}

//else
echo json_encode([
    "status" => "error",
    "message" => "invalid params"
]);
