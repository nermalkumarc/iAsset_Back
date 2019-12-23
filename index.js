var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors())
var bodyParser = require('body-parser'); app.use(bodyParser.json()); app.use(bodyParser.urlencoded({ extended: true }));
var sql = require("mssql");

// config for your database

var config = {
    user: 'testusers',
    password: 'integra123',
    server: 'integra-net4',
    database: 'TEST',
    port: 1433

};

// connect to your database

sql.connect(config, function (err) {

    if (err) { console.log(err) };

    /*********************************************Employee List Api*************************************************/
    /************************************** POST METHOD Employee List API*******************************************/
    app.post('/', function (req, res) {
        console.log("success");
    });

    app.post("/employee", function (req, res) {
        console.log(req.body)
        var request1 = new sql.Request();
        var query = "INSERT INTO [IAS].[Employeelist] (Code,Name,EmailID,MobileNo,Department,Designation,RoleID,DOJ,Gender,Location,isActive,Password) VALUES('" + req.body.Code + "','" + req.body.Name + "','" + req.body.Email + "','" + req.body.Mobile + "','" + req.body.Department + "','" + req.body.Designation + "','" + req.body.Role + "','" + req.body.DOJ + "','" + req.body.Gender + "','" + req.body.Location + "','" + req.body.isActive + "','" + req.body.Password + "')";
        request1.query(query);
        return res.json({ data: "saved successfully" })

    });
    app.post("/login", function (req, res) {
        var request1 = new sql.Request();
        var query = "SELECT ID,Code,Name,Password FROM [IAS].[Employeelist] WHERE CODE='" + req.body.Code + "'AND Password='" + req.body.Password + "'";
        request1.query(query, function (err, result) {
            if (err) { return next(err); }
            else {
                if (result.recordset[0] != undefined) {
                    return res.json({ Data: result.recordset[0] })
                }
                else {
                    return res.json({ Data: "0" })
                }

            }

        });



    });
    /************************************** POST METHOD Employee List API****************************************/
    /************************************** PUT METHOD Employee List API*************************************************/

    app.put("/", function (req, res) {
        console.log("Successfull")
    });
    app.put("/updateemployee/:id", function (req, res) {
        var request1 = new sql.Request();
        request1.query("UPDATE [IAS].[Employeelist] SET Code='" + req.body.Code + "', Name='" + req.body.Name + "',EmailID='" + req.body.Email + "',MobileNo='" + req.body.Mobile + "',Department='" + req.body.Department + "',Designation='" + req.body.Designation + "',RoleID='" + req.body.Role + "',DOJ='" + req.body.DOJ + "',Gender='" + req.body.Gender + "',Location='" + req.body.Location + "',isActive='" + req.body.isActive + "' WHERE ID= " + req.params.id + "");
        return res.json({ data: "updated successfully" })

    });
    app.put("/changepassword/:id", function (req, res) {
        var request1 = new sql.Request();
        console.log(req.body.data)
        request1.query("UPDATE [IAS].[Employeelist] SET Password='" + req.body.data + "' WHERE Code= '" + req.params.id + "'");
        return res.json({ data: "updated successfully" })

    });
    /**************************************END OF PUT METHOD Employee List API*************************************************/
    /************************************** GET Employee List API*************************************************/
    app.get('/', function (req, res) {
        var request = new sql.Request();
        var request1 = new sql.Request();
        var all = {
            DashBoard: {},
            Chart: {}
        };
        request.execute('[IAS].[DashboardChart]', function (err, recordsets, returnValue) {

            all['DashBoard'] = recordsets['recordset'][0]

        });
        request1.execute('[IAS].[AssertChart]', function (err, recordsets, returnValue) {

            all['Chart'] = recordsets['recordset']

            return res.json({ All: all })
        });


    });
    app.get('/subdetails', function (req, res, next) {
        var request1 = new sql.Request();
        request1.query("select Name,Category from [IAS].[Subdetails] ORDER BY Category ASC", function (err, result) {
            if (err) { return next(err); }
            else {
                return res.json({ subdetails: result.recordsets['0'] })
            }

        });
    });
    app.get('/employeelist', function (req, res, next) {
        var request1 = new sql.Request();
        request1.query("select ID, Code,Name,Department,Designation,Location from IAS.Employeelist where isActive='true'", function (err, result) {
            if (err) { return next(err); }
            else {
                return res.json({ data: result.recordsets['0'] })
            }

        });
    });

    app.get('/employeelist/:id', function (req, res, next) {
        var request1 = new sql.Request();
        request1.query("select * from IAS.Employeelist where Code='" + req.params.id + "'", function (err, result) {
            if (err) { return next(err); }
            else {
                return res.json({ SingleData: result.recordsets['0'] })
            }

        });
    });
    app.get('/uniquechecker/:code/:id', function (req, res, next) {
        var request1 = new sql.Request();
        request1.query("select Name from [IAS].[Employeelist] where Code='" + req.params.code + "'and ID != " + req.params.id + " ", function (err, result) {
            if (err) { return next(err); }
            else {
                if (result.recordsets['0'] != "") {
                    return res.json({ UniqueData: false })
                    //console.log("unique"+ JSON.stringify(result.recordsets['0']))
                }
                else {
                    return res.json({ UniqueData: true })
                    //console.log("nothing find")
                }

                //return res.json({subdetails:result.recordsets['0']})
            }

        });
    });
    /**************************************END OF GET Employee List API*************************************************/

    /*****************************************END OF Employee List Api************************************************/

    /************************************** STARTING Employee Asset API*******************************************/
    
    /************************************** POST METHOD Employee Asset API*******************************************/
    app.post('/', function (req, res) {
        console.log("success");
    });

    app.post("/employeeasset", function (req, res) {
        console.log(req.body)
        var request1 = new sql.Request();
        var query = "INSERT INTO [IAS].[Employeeasset] (EmpCode,AssetId,Remarks,IssuedOn) VALUES('" + req.body.EmpCode + "','" + req.body.AssetId + "','" + req.body.Remarks + "','" + req.body.IssuedOn + "')";
        request1.query(query);
        //executeQuery (res, query);
    });


    /************************************** POST METHOD Employee Asset API****************************************/
    
    /************************************** GET METHOD Employee Asset API****************************************/

    app.get('/employeeassetlist', function (req, res, next) {
        var request1 = new sql.Request();
        request1.query("select EL.Id, EL.Name,EL.Code EmpCode,EL.Department,EL.Designation,AL.Code,AL.Name Assetname,convert(varchar,EA.IssuedOn,103)IssuedOn  from IAS.Employeeasset EA inner join IAS.Employeelist EL on EA.EmpId= EL.ID inner join IAS.Assetlist AL on AL.ID = EA.AssetId where AL.Status='In Use'", function (err, result) {
            if (err) { return next(err); }
            else {
                return res.json({ data: result.recordsets['0'] })
            }

        });
    });
    app.get('/', function (req, res) {
        res.send("Connected successfully")
    });
    app.get('/dropdownassetdetail', function (req, res, next) {
        var request1 = new sql.Request();
        request1.query("select distinct Name from IAS.AssetList where Status='available'", function (err, result) {
            if (err) { return next(err); }
            else {
                return res.json({ dropdownasset: result.recordsets['0'] })
            }

        });
    });
    app.get('/getassetdetail/:name', function (req, res, next) {
        var request1 = new sql.Request();
        request1.query("select Id AssetId,Code from IAS.AssetList where Name='" + req.params.name + "' and Status='available'", function (err, result) {
            if (err) { return next(err); }
            else {
                console.log(result.recordsets[0])
                return res.json({ getasset: result.recordsets[0] })

            }

        });
    });
    app.get('/dropdownemployeedetail', function (req, res, next) {
        var request1 = new sql.Request();
        request1.query(" select Id EmpId, Name Empname,Code Empcode from IAS.Employeelist", function (err, result) {
            if (err) { return next(err); }
            else {
                return res.json({ dropdownemployee: result.recordsets['0'] })
            }

        });
    });

    app.get('/employeeassetlist/:id/:code', function (req, res, next) {
        var request1 = new sql.Request();
        request1.query("select EL.Name,EL.Code EmpCode,AL.ID AssetID,EL.ID EmpId,EA.ID,EA.IssuedOn,EA.Remarks,AL.Code,AL.Name Assetname from IAS.Employeeasset EA inner join IAS.Employeelist EL on EA.EmpId= EL.ID inner join IAS.Assetlist AL on AL.ID = EA.AssetId where EL.Code='" + req.params.id + "' and AL.Code='" + req.params.code + "'", function (err, result) {
            if (err) { return next(err); }
            else {
                return res.json({ SingleData: result.recordsets['0'] })
            }

        });
    });
    /************************************** GET METHOD Employee Asset API****************************************/
    /************************************** PUT METHOD Employee Asset API****************************************/

    app.post("/", function (req, res) {
        console.log("Successfull")
    });
    app.post("/updateasset/", function (req, res) {
        console.log(req.body)
        var request1 = new sql.Request();

        request1.input('Id', sql.Int, `${req.body.Id}`);
        request1.input('EmpId', sql.Int, `${req.body.EmpId}`);
        request1.input('AssetId', sql.Int, `${req.body.AssetID}`);

        request1.input('Remarks', sql.VarChar(30), `${req.body.Remarks}`);
        request1.input('IssuedOn', sql.VarChar(30), `2019-03-19 06:51:48.540`);
        request1.input('ReturnOn', sql.VarChar(30), `2019-03-19 06:51:48.540`);
        request1.input('Reason', sql.VarChar(255), `${req.body.Reason}`);
        request1.input('Status', sql.VarChar(255), `${req.body.Status}`);

        request1.execute('[IAS].[AssetEmployee]', function (err, result) {
            // console.log(result);
            console.log(err);
        });
    });

    /************************************** PUT METHOD Employee Asset API****************************************/

    /*****************************************END OF Employee Asset Api************************************************/

    /**************************************** START OF Asset List Api ***********************************************/

    /************************************** GET METHOD Asset List API****************************************/
    app.get('/', function (req, res) {
        res.send("Connected successfully")
    });

    app.get('/assetlist/:id', function (req, res, next) {
        var request1 = new sql.Request();
        request1.query("select ID, Code, Name, BrandName ,Status from IAS.Assetlist where ID='" + req.params.id + "'", function (err, result) {
            if (err) { return next(err); }
            else {
                return res.json({ SingleData: result.recordsets['0'] })
            }

        });
    });

    app.get('/assetlist', function (req, res, next) {
        var request1 = new sql.Request();
        request1.query("select ID, Code, Name, BrandName, Status from IAS.Assetlist where Status != '' and Status != 'Damaged' and Status is NOT NULL", function (err, result) {
            if (err) { return next(err); }
            else {
                return res.json({ data: result.recordsets['0'] })
            }

        });
    });
    app.get('/uniqueassetchecker/:code/:id', function (req, res, next) {
        var request1 = new sql.Request();
        request1.query("select Name from [IAS].[Assetlist] where Code='" + req.params.code + "' and ID != " + req.params.id, function (err, result) {
            if (err) { return next(err); }
            else {
                if (result.recordsets['0'] != "") {
                    return res.json({ UniqueData: false })
                }
                else {
                    return res.json({ UniqueData: true })
                }
            }

        });
    });
    /************************************** GET METHOD Asset List API ***************************************/

    /************************************** POST METHOD Asset List API ***************************************/
    app.post("/asset", function (req, res) {
        console.log(req.body);
        var request1 = new sql.Request();
        var query = "INSERT INTO [IAS].[Assetlist] (Code,Name,BrandName,Status) VALUES('" + req.body.Code + "','" + req.body.Name + "','" + req.body.BrandName + "','" + req.body.Status + "')";
        request1.query(query, function () {
            if (err) { return next(err); }
            else {
                console.log("Success");
                return res.json({ data: "Success" })

            }
        });

    });

    /************************************** POST METHOD Asset List API ***************************************/

    /************************************** PUT METHOD Asset List API ***************************************/

    app.put("/", function (req, res) {
        console.log("Successfull")
    });
    app.put("/updateasset/:id", function (req, res) {
        var request1 = new sql.Request();
        request1.query("UPDATE [IAS].[Assetlist] SET Code='" + req.body.Code + "', Name='" + req.body.Name + "',BrandName='" + req.body.BrandName + "',Status='" + req.body.Status + "' WHERE ID= " + req.body.ID + "")
        return res.json({ data: "Updates" })
    });

    /************************************** PUT METHOD Asset List API ***************************************/

    /***************************************** END OF Asset List Api ***********************************************/

});

app.listen(5000, function () {
    console.log('Server is running..');
});
