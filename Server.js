var express = require('express');
var app = express();


const fs = require('fs');

class TypeOfUser 
{
    static manager=false;
      
}


app.use(express.static(__dirname))

app.get('/', function (req, res) 
{
    res.sendFile( __dirname + "/first/" + "first.html" );
})

const client_cred_access_token = 'fakeToken';

 app.get('/do_login', function (req, res) 
{
  
    var username= req.query.first_name;
    var password= req.query.password;

    if(username=="manager")
    {
        if(password==1234)
        {
            TypeOfUser.manager=true;
             console.log(username);
             console.log(password);

        
             // send table size determination page
             fs.readFile(__dirname + "/table/" + "table.html", 'utf8', function(err, contents) 
             {
                let modifiedContents = contents.replace('%%PUBLICKEY%%','manager');

                let modifiedContents1 = modifiedContents.replace('%%PUBLICKEY1234%%','yossi');

                res.send(modifiedContents1);
            });

        }
        else
        {
           //alert(` The Password is incorrect `);
            res.send('<script>alert(" The Password is incorrect "); window.location.href = "/"; </script>');
            return;
        }
    }   
    else
    {
        if(username=="yossi")
        {
            if(password==1234)
            {
                
                TypeOfUser.manager=false;
                 console.log(username);
                 console.log(password);
                
                 fs.readFile(__dirname + "/table/" + "table.html", 'utf8', function(err, contents) 
                 {
                    let modifiedContents = contents.replace('%%PUBLICKEY%%','yossi');
                    res.send(modifiedContents);
                });
            }
            else
            {
                //alert(` The Password is incorrect `);
                res.send('<script>alert(" The Password is incorrect "); window.location.href = "/"; </script>');

                return;
            }
        }
        else
        {
            res.send('<script>alert(" The UserName or the password is not exists "); window.location.href = "/"; </script>');

            return;

        }
    }

})
 


 app.get('/do_game', function (req, res) 
{
  
    var table_row= req.query.table_row;
    var table_col= req.query.table_col;
    

        // if(table_col=='string'&&table_row=='string')
        // {
           
                console.log("got game data: row="+table_row + " col="+table_col +" manager ="+ TypeOfUser.manager);

                if( TypeOfUser.manager==true)
                {
                   
                    if(((table_row*table_col)%2)!=0)
                    {
                                
                            //res.send('<script>alert(" its an odd number "); window.location.reload(); </script>');
                                // alert(`it's an odd number`);
                                res.sendFile( __dirname + "/table/" + "table.html" );
                     }
                    else
                    {
                        if(parseInt(table_row)<=0||parseInt(table_col)<=0||parseInt(table_row)>=8||parseInt(table_col)>=8)
                        {
                            
                            //res.send('<script>alert(" Enter a number greater than zero "); window.location.reload(); </script>');
                            res.sendFile( __dirname + "/table/" + "table.html" );  
                        }
                        else
                        {
                            console.log("siiiiiiiii");
                            fs.readFile(__dirname + "/game/" + "MemoryGame.html", 'utf8', function(err, contents) 
                            {
                                let modifiedContents = contents.replace('%%ROWS_KEY%%',table_row);

                                let modifiedContents1 = modifiedContents.replace('%%COLS_KEY%%',table_col);

                                res.send(modifiedContents1);
                            
                            }); 
                        }

                    } 
                }
                else
                {
                    if(parseInt(table_col)*parseInt(table_row)<=20)
                    {

                        if(parseInt(table_row)<=0||parseInt(table_col)<=0||parseInt(table_row)>=8||parseInt(table_col)>=8)
                        {
                            
                            //res.send('<script>alert(" Enter a number greater than zero "); window.location.reload(); </script>');
                            res.sendFile( __dirname + "/table/" + "table.html" );  
                        }
                        else
                        {
                            //cheaking if it's Even number
                            if(((parseInt(table_row)*parseInt(table_col))%2)!=0)
                            {
                                
                            //res.send('<script>alert(" its an odd number "); window.location.reload(); </script>');
                                // alert(`it's an odd number`);
                                res.sendFile( __dirname + "/table/" + "table.html" );
                            }
                            else
                            {
                                fs.readFile(__dirname + "/game/" + "MemoryGame.html", 'utf8', function(err, contents) 
                                {
                                    let modifiedContents = contents.replace('%%ROWS_KEY%%',table_row);
                    
                                    let modifiedContents1 = modifiedContents.replace('%%COLS_KEY%%',table_col);
                    
                                    res.send(modifiedContents1);
                                });
                                                    
                                                
                            }

                    
                        }   
                    }
                                else
                                {
                                    //alert(`You need the number that the multiplication between rows and columns is less than 30`);
                                    
                                    //res.send('<script>alert(" You need the number that the multiplication between rows and columns is less than 30 "); window.location.reload(); </script>');
                                    res.sendFile( __dirname + "/table/" + "table.html" );
                                }
                            

            }
            // else
            // {
            // console.log(table_col+" "+table_row);
            // res.sendFile( __dirname + "/table/" + "table.html" );

            // }  
        
       


});


 var server = app.listen(8081, function () 
 {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })
 
 
 
 
 
 
 
 
