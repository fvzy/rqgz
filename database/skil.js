const mysql = require("mysql");

conn = mysql.createConnection({
    host: "server01.eughost.com",
        user: "shiziyama_userlistkey",
            password: "shiziyama_listkeyapi",
                database: "shiziyama_listkeyapi",
                    port: 3306
                    });

                    conn.connect((err) => {
                        if (err) throw err;
                            else {
                                    console.log("Database connected!");
                                        }
                                        });

                                        module.exports = conn;
