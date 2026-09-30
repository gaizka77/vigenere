/**
 * Vigenère Cipher
 *
 * Enkripsi:
 * C = (P + K) mod 26
 *
 * Dekripsi:
 * P = (C - K + 26) mod 26
 */

/**
 * Membersihkan key
 */
function cleanKey(key) {

    return key
        .toUpperCase()
        .replace(/[^A-Z]/g, "");
}


/**
 * Enkripsi menggunakan Vigenère Cipher
 */
function encryptVigenere(text, key) {

    key = cleanKey(key);

    if (key.length === 0) {
        throw new Error(
            "Secret key harus mengandung huruf A-Z."
        );
    }

    let result = "";

    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {

        let char = text[i];

        if (/[A-Za-z]/.test(char)) {

            let base =
                char === char.toUpperCase()
                    ? 65
                    : 97;

            let plainValue =
                char.charCodeAt(0) - base;

            let keyValue =
                key.charCodeAt(
                    keyIndex % key.length
                ) - 65;

            let encryptedValue =
                (plainValue + keyValue) % 26;

            result += String.fromCharCode(
                encryptedValue + base
            );

            keyIndex++;

        } else {

            // Spasi, angka, tanda baca tetap
            result += char;
        }
    }

    return result;
}


/**
 * Dekripsi menggunakan Vigenère Cipher
 */
function decryptVigenere(text, key) {

    key = cleanKey(key);

    if (key.length === 0) {
        throw new Error(
            "Secret key harus mengandung huruf A-Z."
        );
    }

    let result = "";

    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {

        let char = text[i];

        if (/[A-Za-z]/.test(char)) {

            let base =
                char === char.toUpperCase()
                    ? 65
                    : 97;

            let cipherValue =
                char.charCodeAt(0) - base;

            let keyValue =
                key.charCodeAt(
                    keyIndex % key.length
                ) - 65;

            let decryptedValue =
                (cipherValue - keyValue + 26) % 26;

            result += String.fromCharCode(
                decryptedValue + base
            );

            keyIndex++;

        } else {

            result += char;
        }
    }

    return result;
}