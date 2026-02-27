INSERT INTO roles (name)
VALUES ('ADMIN'), ('USER')
ON CONFLICT (name) DO NOTHING;

INSERT INTO users (id, name, email, password_hash, role_id)
VALUES
(
    uuid_generate_v4(),
    'Admin Principal',
    'admin@woow.com',
    '$2b$10$ky97VK.NyY0.V5wpxnuzbuGJ6C9guyrSi2aFXtA28Eq/yz45.aPUu',
    (SELECT id FROM roles WHERE name = 'ADMIN' AND deleted_at IS NULL)
),
(
    uuid_generate_v4(),
    'Usuario Normal',
    'user@woow.com',
    '$2b$10$ky97VK.NyY0.V5wpxnuzbuGJ6C9guyrSi2aFXtA28Eq/yz45.aPUu',
    (SELECT id FROM roles WHERE name = 'USER' AND deleted_at IS NULL)
);