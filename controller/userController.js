let router = express();
let bodyparser = require('body-parser');
let nodemailer = require('nodemailer');
let bcryptjs = require('bcrypt');

let db = require('../Database/db');

router.use(bodyparser.urlencoded({ extended: true }));
router.use(bodyparser.json());


// SEND MAIL USING NODEMAILER PACKAGE
let dataTravel = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'hindustanschool1@gmail.com',
        pass: 'ajayajayajay'
    }, tls:
    {
        rejectUnauthorized: false
    }
});

// MAIL API SEND TO THE USER
exports.mailUser= (req, res) => {
    const { email } = req.body;
    const output = `
  <h1>Welcome</h1><br>
  <table><tr>sno</tr><td>1</td><tr>name</tr><td>Testing Mail</td></table>
  `;
    dataTravel.sendMail(
        {
            to: email,
            from: process.env.emailid,
            subject: "Welcome",
            html: output
        },
        (err, info) => {
            if (err) {
                return res.json({ err: err });
            }
            console.log("Message sent: %s", info.messageId);
            res.status(200).json({ msg: "Message sent" });
        }
    );
}


//TESTING API
exports.testingAPI= (req, res) => {
    console.log(req.body);
    res.send({ 'data': 'Testing API' });
}


// TABLE CREATION
exports.createTable = (req, res) => {
    db.query('create table employee(id int,empname varchar(50),salary varchar(50))')
        .then(result => {
            res.send(result)
        }).catch(err => {
            res.send(err)
        });
}


//INSERTING DATA IN ENCRYPTION FORMAT INTO DATABASE 
exports.insertTable= (req, res) => {
    var { id, empname, salary, email, password } = req.body;
    bcryptjs.genSalt(12, (err, salt) => {
        bcryptjs.hash(password, salt, function (err, hash) {
            if (err) throw err;
            password = hash;
            let sql = `INSERT INTO employee (id, empname, salary, email, password) VALUES ( ${id} ,"${empname}","${salary}","${email}","${password}")`;
            db.query(sql)
                .then(result => {
                    res.json({result: 'Data Inserted Successfully'});
                    console.log('Data Inserted Successfully')
                })
                .catch(error => {
                    res.send(error)
          })
        })
    })
}



// RETRIVING DATA
exports.getData = (req, res) => {
    console.log(process.env.emailid)
    let sql = 'SELECT id,email,salary,empname FROM EMPLOYEE';
    db.query(sql).then(result => {
        res.send(result);
    }).catch(error => {
        res.send(error);
    })
}


// GETTING A ROW BASED ON ID BCRYPT COMPARE
exports.getID= (req, res) => {
    const { password } = req.body
    db.query(`SELECT *FROM EMPLOYEE WHERE ID=${req.params.id}`)
        .then(result => {
            bcryptjs.compare(password, result[0].password, (err, match) => {
                if (err)
                    throw err
                if (match)
                    res.json({ msg: "Data exist" })
                else
                    res.json({ msg: "Data not exist" })
            })
        }).catch(error => {
            res.send(error)
        })
}

 
//DELETING A ROW
exports.deleteUser = (req, res) => {
    db.query(`DELETE FROM EMPLOYEE WHERE ID= ${req.params.id}`)
        .then(result => {
            res.status(200).json({ msg: 'Delete Successfully' });
        }).catch(error => {
            res.send(error)
            res.status(404).json({error});
      })
}


//UPDATING A ROW
exports.updateUser = (req, res) => {
    let { empname, salary, email } = req.body;
    db.query(`UPDATE EMPLOYEE SET empname ="${empname}",salary ="${salary}", email = "${email}" WHERE ID =${req.params.id}`)
        .then(result => {
            res.json({ Success: 'Update Successfully' });
        }).catch(error => {
            res.json({ error: 'Not Updated' });
      })
}

