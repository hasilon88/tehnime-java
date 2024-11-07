package com.tehnime.backend.utils;

import com.tehnime.backend.utils.logger.Log;
import org.apache.commons.codec.digest.DigestUtils;
import org.jasypt.util.text.AES256TextEncryptor;
import org.mindrot.jbcrypt.BCrypt;

public class Security {
    @Log
    public String hash(String stringToHash) {return DigestUtils.sha256Hex(stringToHash);}

    @Log
    public String hashWithSalt(String stringToHash) {
        return BCrypt.hashpw(stringToHash, BCrypt.gensalt(10));
    }

    @Log
    public Boolean verifyTextToHash(String plainText, String hash) {
        return BCrypt.checkpw(plainText, hash);
    }

    @Log
    public Boolean verifyHashToHash(String firstHash, String secondHash) {
        return firstHash.equals(secondHash);
    }

    @Log
    public String encrypt(String stringToEncrypt, String encryptionKey) {
        AES256TextEncryptor encryptor = new AES256TextEncryptor();
        encryptor.setPassword(encryptionKey);

        return encryptor.encrypt(stringToEncrypt);
    }

    @Log
    public String decrypt(String stringToDecrypt, String encryptionKey) {
        AES256TextEncryptor encryptor = new AES256TextEncryptor();
        encryptor.setPassword(encryptionKey);

        return encryptor.decrypt(stringToDecrypt);
    }
}
