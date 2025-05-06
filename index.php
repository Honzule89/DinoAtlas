<?php
$dinosauri = require 'dinos.php';
?>
<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <title>Atlas Dinosaurů</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
</head>
<body>
<header>
    <h1>Atlas Dinosaurů</h1>
    <p>Prozkoumejte fascinující svět dinosaurů!</p>
</header>

<main>
    <div class="filter-top-row">
        <div class="filter-group">
            <label for="sort"><strong>Řadit podle:</strong></label><br>
            <select id="sort">
                <option value="name-asc">🔼 Název (A–Z)</option>
                <option value="name-desc">🔽 Název (Z–A)</option>
                <option value="chodidla">👣 Počet chodidel</option>
                <option value="velikost">📏 Velikost</option>
            </select>
        </div>
        <button id="reset-filters" class="reset-btn">Resetovat filtry</button>
    </div>

    <div class="content-wrapper">
        <aside class="filter-sidebar">
            <div class="filter-columns">
                <div class="filter-group">
                    <label><strong>Období:</strong></label><br>
                    <input type="checkbox" name="obdobi[]" value="křída"> Křída<br>
                    <input type="checkbox" name="obdobi[]" value="jura"> Jura<br>
                    <input type="checkbox" name="obdobi[]" value="trias"> Trias<br>
                </div>

                <div class="filter-group">
                    <label><strong>Velikost:</strong></label><br>
                    <input type="checkbox" name="velikost[]" value="malý"> Malý<br>
                    <input type="checkbox" name="velikost[]" value="střední"> Střední<br>
                    <input type="checkbox" name="velikost[]" value="velký"> Velký<br>
                    <input type="checkbox" name="velikost[]" value="obří"> Obří<br>
                </div>

                <div class="filter-group">
                    <label><strong>Potrava:</strong></label><br>
                    <input type="checkbox" name="potrava[]" value="býložravec"> Býložravec<br>
                    <input type="checkbox" name="potrava[]" value="masožravec"> Masožravec<br>
                    <input type="checkbox" name="potrava[]" value="všežravec"> Všežravec<br>
                    <input type="checkbox" name="potrava[]" value="ryby"> Ryby<br>
                    <input type="checkbox" name="potrava[]" value="plankton"> Plankton<br>
                </div>

                <div class="filter-group">
                    <label><strong>Počet chodidel:</strong></label><br>
                    <input type="checkbox" name="chodidla[]" value="2"> 2<br>
                    <input type="checkbox" name="chodidla[]" value="4"> 4<br>
                </div>

                <div class="filter-group">
                    <label><strong>Křídla:</strong></label><br>
                    <input type="checkbox" name="kridla[]" value="ano"> Křídla<br>
                    <input type="checkbox" name="kridla[]" value="ne"> Bez křídel<br>
                </div>

                <div class="filter-group">
                    <label for="search"><strong>Vyhledávání:</strong></label><br>
                    <input type="text" id="search" placeholder="Zadejte název...">
                </div>
            </div>
        </aside>

        <div class="dino-list-grid" id="dino-list">
            <?php foreach ($dinosauri as $dino): ?>
                <div class="dino-item"
                     data-name="<?= strtolower($dino['name']) ?>"
                     data-velikost="<?= $dino['velikost'] ?>"
                     data-obdobi="<?= $dino['obdobi'] ?>"
                     data-potrava="<?= $dino['potrava'] ?>"
                     data-chodidla="<?= $dino['chodidla'] ?>"
                     data-kridla="<?= $dino['kridla'] ?? 'ne' ?>"
                     data-description="<?= $dino['description'] ?>"
                     data-image="<?= $dino['image'] ?>">
                    <img src="<?= $dino['image'] ?>" alt="<?= $dino['name'] ?>" class="dino-image">
                    <h2><?= $dino['name'] ?></h2>
                    <div class="hover-text">Pro více informací klikni</div>
                </div>
            <?php endforeach; ?>
        </div>

        <!-- Stránkování -->
        <div class="pagination" id="pagination"></div>
    </div>
</main>

<!-- Modální okno -->
<div id="modal" class="modal hidden">
    <div class="modal-content">
        <span id="modal-close">&times;</span>
        <div class="modal-body">
            <div class="modal-image">
                <img id="modal-img" src="" alt="">
            </div>
            <div class="modal-text">
                <h2 id="modal-name"></h2>
                <p id="modal-description"></p>
            </div>
        </div>
    </div>
</div>

<footer>
    <p>&copy; 2025 Atlas Dinosaurů</p>
</footer>

<script>
    const dinosaurs = <?php echo json_encode($dinosauri, JSON_UNESCAPED_UNICODE); ?>;
</script>
<script src="script.js"></script>
</body>
</html>
