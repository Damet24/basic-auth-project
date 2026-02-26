INSERT INTO users (id, name, email, password_hash, role)
VALUES
(
    uuid_generate_v4(),
    'Admin Principal',
    'admin@woow.com',
    '$2b$10$ky97VK.NyY0.V5wpxnuzbuGJ6C9guyrSi2aFXtA28Eq/yz45.aPUu',
    'ADMIN'
),
(
    uuid_generate_v4(),
    'Usuario Normal',
    'user@woow.com',
    '$2b$10$ky97VK.NyY0.V5wpxnuzbuGJ6C9guyrSi2aFXtA28Eq/yz45.aPUu',
    'USER'
);