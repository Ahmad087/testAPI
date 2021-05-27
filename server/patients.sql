CREATE TABLE IF NOT EXISTS patients (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    f_name VARCHAR(255) NOT NULL,
    l_name VARCHAR(255),

    location VARCHAR(255),
    dob VARCHAR(255),
    illness VARCHAR(255)
);

INSERT INTO patient ( f_name,l_name,location,dob,illness) VALUES ('john','doe','dublin','1990-09-01','ligma');
