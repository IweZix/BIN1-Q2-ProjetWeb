const db = require('./db_conf');

module.exports.save = (data) => {
    console.log(data);
    const stmt = db.prepare('INSERT INTO users(name, firstname, email, password,admin) VALUES (?, ?, ?, ?,0)');
    const info = stmt.run(data.name, data.firstname, data.email, data.password);
    console.log("user model save member" + info.changes);
}


module.exports.find = (email) => {
    console.log(email);
    return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
}
