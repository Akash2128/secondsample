var API_KEY=1234
var express=require('express')
var router=express.Router()
var moment=require('moment')

//GET
/*router.get('/slider',function(req,res,next){
   // res.send('hello word')
   req.getConnection(function(error,conn){
    conn.query('SELECT * FROM slider',function(err,result,field){
        if(err) throw err;
       // res.end(JSON.stringify(result));
    res.send('hello word')

      });*/

//post / get

/*router.get("/slider",(req,res,next)=>{
    conn.query("SELECT * FROM slider",function(err,result,field){
      if(err) throw err;
      res.end(JSON.stringify(result));
    });
});*/

router.get('/slider',function(req,res,next){
    //slider
   // if(req.query.key==API_KEY){
  // var fbid=req.query.fbid
  // if(fbid!=null){
    req.getConnection(function(error,conn){
        conn.query('SELECT * FROM slider',function(err,rows,fields){
            if(error){
                res.status(500)
                res.send(JSON.stringify({success:false,message:error.message}))
            }else{
                if(rows.length>0){
                    res.send(JSON.stringify({success:true,result:rows}))
                }else{
                    res.send(JSON.stringify({success:false,message:"Empty"}))
                }
            }
        })
    })
   
  /* }else{
       res.send(JSON.stringify({success: false,message:"Missing fbid in query"}))
   }*/
   
   
     /*  }else{
           res.send(JSON.stringify({success:false ,message:"Wrong Api key"}))
       }*/
   })



   //select all favoriate
   router.get('/getfavprote',function(req,res,next){
    //slider
   // if(req.query.key==API_KEY){
  // var fbid=req.query.fbid
  // if(fbid!=null){
       req.getConnection(function(error,conn){
           conn.query('SELECT * FROM favorite',function(err,rows,fields){
               if(error){
                   res.status(500)
                   res.send(JSON.stringify({success:false,message:error.message}))
               }else{
                   if(rows.length>0){
                       res.send(JSON.stringify({success:true,result:rows}))
                   }else{
                       res.send(JSON.stringify({success:false,message:"Empty"}))
                   }
               }
           })
       })
    })






router.get('/user',function(req,res,next){
 if(req.query.key==API_KEY){
var fbid=req.query.fbid
var password=req.query.userName;
if(fbid!=null){
    req.getConnection(function(error,conn){
        conn.query('SELECT UserPhone,Name,Address,FBID FROM User WHERE FBID=?',[fbid],function(err,rows,fields){
            if(error){
                res.status(500)
                res.send(JSON.stringify({success:false,message:error.message}))
            }else{
                if(rows.length>0){
                    if(rows[0].Name==password){
                        res.send(JSON.stringify({success:false,result:"Login Success",data:rows}))
                    }else{
                    res.send(JSON.stringify({success:true,result:"Wrong Password"}))
                    }
                }else{
                    res.send(JSON.stringify({success:false,message:"Empty"}))
                }
            }
        })
    })

}else{
    res.send(JSON.stringify({success: false,message:"Missing fbid in query"}))
}


    }else{
        res.send(JSON.stringify({success:false ,message:"Wrong Api key"}))
    }
})

router.post('/useregister',function(req,res,next){
    if(req.query.key==API_KEY){
  // var fbid=req.query.fbid
       req.getConnection(function(error,conn){
           conn.query('SELECT name,phone,email,address FROM useregister WHERE id=?',[fbid],function(err,rows,fields){
               if(error){
                   res.status(500)
                   res.send(JSON.stringify({success:false,message:error.message}))
               }else{
                   if(rows.length>0){
                       res.send(JSON.stringify({success:true,result:rows}))
                   }else{
                       res.send(JSON.stringify({success:false,message:"Empty"}))
                   }
               }
           })
       })
   
  

}else{
    res.send(JSON.stringify({success:false ,message:"Wrong Api key"}))
}
})





router.post('/userone',function(req,res,next){
   if(req.body.key==API_KEY){
   var fbid=req.body.fbid
   var user_phone=req.body.userPhone
   var user_name=req.body.userName
   var user_address=req.body.userAddress
   if(fbid!=null){
       req.getConnection(function(error,conn){
           conn.query('INSERT INTO User(FBID,UserPhone,Name,Address) VALUES(?,?,?,?) ON DUPLICATE KEY UPDATE Name=?,Address=?',[fbid,user_phone,user_name,user_address,user_name,user_address],function(err,rows,fields){
               if(error){
                   res.status(500)
                   res.send(JSON.stringify({success:false,message:error.message}))
               }else{
                   if(rows.affectedRows>0){
                       res.send(JSON.stringify({success:true,result:req.body,message:"Success"}))
                       
                   }
               }
           })
       })
   
   }else{
       res.send(JSON.stringify({success: false,message:"Missing fbid in query"}))
   }
   
   
       }else{
           res.send(JSON.stringify({success:false ,message:"Wrong Api key"}))
       }
   })

   //favorite table
   //get /post/delete

   router.get('/favorite',function(req,res,next){
    if(req.query.key==API_KEY){
   var fbid=req.query.fbid
   if(fbid!=null){
       req.getConnection(function(error,conn){
           conn.query('SELECT fbid,foodId,restaurantId,restaurantName,foodName,foodImage,price FROM Favorite WHERE fbid=?',[fbid],function(err,rows,fields){
               if(error){
                   res.status(500)
                   res.send(JSON.stringify({success:false,message:error.message}))
               }else{
                   if(rows.length>0){
                       res.send(JSON.stringify({success:true,result:rows}))
                   }else{
                       res.send(JSON.stringify({success:false,message:"Empty"}))
                   }
               }
           })
       })
   
   }else{
       res.send(JSON.stringify({success: false,message:"Missing fbid in query"}))
   }
   
   
       }else{
           res.send(JSON.stringify({success:false ,message:"Wrong Api key"}))
       }
   })
  
   router.post('/favorite',function(req,res,next){
       
    if(req.body.key==API_KEY){
   var fbid=req.body.fbid
   var food_id=req.body.foodId
   var restairant_id=req.body.restoudantId
   var restaudantname=req.body.restaudantname
   var food_name=req.body.food_name
   var food_image=req.body.food_image
   var food_price=req.body.price
   if(fbid!=null){
       req.getConnection(function(error,conn){
           conn.query('INSERT INTO favorite(FBID,FoodId,RestaurantId,RestaurantName,FoodName,FoodImage,Price) VALUES(?,?,?,?,?,?,?)',[fbid,food_id,restairant_id,restaudantname,food_name,food_image,food_price],function(err,rows,fields){
               if(error){
                   res.status(500)
                   res.send(JSON.stringify({success:false,message:error.message}))
               }else{
                   if(rows.affectedRows>0){
                       res.send(JSON.stringify({success:true,result:req.body,message:"Success"}))
                       
                   }
               }
           })
       })
   
   }else{
       res.send(JSON.stringify({success: false,message:"Missing fbid in query"}))
   }
   
   
       }else{
           res.send(JSON.stringify({success:false ,message:"Wrong Api key"}))
       }
   })

   router.post('/studentregi',function(req,res,next){
   var name1=req.body.name
   var email1=req.body.email
   var phone1=req.body.phone
   var address1=req.body.address
   var city1=req.body.city
   var password1=req.body.password
  
       req.getConnection(function(error,conn){
           conn.query('INSERT INTO studentregi(name,email,phone,address,city,password) VALUES(?,?,?,?,?,?)',[name1,email1,phone1,address1,city1,password1],function(err,rows,fields){
               if(error){
                   res.status(500)
                   res.send(JSON.stringify({success:false,message:error.message}))
               }else{
                   if(rows.affectedRows>0){
                       res.send(JSON.stringify({success:true,message:"Success",result:req.body}))
 
                   }
               }
           })
       })
   })


   
   router.post('/studentregister',function(req,res,next){
    
    var name1=req.body.name
    var email1=req.body.email
    var phone1=req.body.phone
    var address1=req.body.address
    var city1=req.body.city
    var password1=req.body.password
    if(name1!=null&&email1!=null&&phone1!=null&&address1!=null&&city1!=null&&password1!=null){
       req.getConnection(function(error,conn){
           conn.query('INSERT INTO patient_register(name,email,phone,address,city,password) VALUES(?,?,?,?,?,?,)',[name1,email1,phone1,address1,city1,password1],function(err,rows,fields){
               if(error){
                   res.status(500)
                   res.send(JSON.stringify({success:false,message:error.message}))
               }else{
                   if(rows.affectedRows>0){
                       res.send(JSON.stringify({success:true,result:req.body,message:"Success"}))
                       
                   }
               }
           })
       })
   
   }else{
       res.send(JSON.stringify({success: false,message:"Missing fbid in query"}))
   }
   })








   //hospital api

   router.post('/patient_register',function(req,res,next){
   // var file = req.body.image
    var name1=req.body.name
    var email1=req.body.email
    var phone1=req.body.phone
    var address1=req.body.address
    var city1=req.body.city
    var password1=req.body.password
   
 if(name1!=null&&email1!=null&&phone1!=null&&address1!=null&&city1!=null&&password1!=null){
      req.getConnection(function(error,conn){
            conn.query('INSERT INTO patient_register(name,email,phone,address,city,password) VALUES(?,?,?,?,?,?,)',[name1,email1,phone1,address1,city1,password1],function(err,rows,fields){
                if(error){
                    res.status(500)
                    res.send(JSON.stringify({success:false,message:error.message}))
                }else{
                    if(rows.affectedRows>0){
                        res.send(JSON.stringify({success:true,result:req.body,message:"Success"}))
                     // res.send(JSON.stringify({success:true,result:"Register Success",dataregister:rows})) 
                    }
                }
            })
        })
    }else{
        res.send(JSON.stringify({success:false ,message:"Missing Field Please Check"})) 
    }
    })
   
router.post('/patient_login',function(req,res,next){
   var phone=req.body.phone
   var password=req.body.password;
   if(phone!=null){
       req.getConnection(function(error,conn){
           conn.query('SELECT id,name,email,address,phone,city,password FROM studentregi WHERE phone=?',[phone],function(err,rows,fields){
               if(error){
                   res.status(500)
                   res.send(JSON.stringify({success:false,message:error.message}))
               }else{
                   if(rows.length>0){
                       if(rows[0].password==password){
                           res.send(JSON.stringify({success:false,result:"Login Success",data:rows}))
                       }else{
                       res.send(JSON.stringify({success:true,result:"Wrong Password"}))
                       }
                   }else{
                       res.send(JSON.stringify({success:false,message:"Empty"}))
                   }
               }
           })
       })
   
   }else{
       res.send(JSON.stringify({success: false,message:"Missing Feild Please Check Phone Password"}))
   }
   })

   router.put('/updateprofile/:id',function(req,res,next){
       var id1=req.body.id;
       var name1=req.body.name;
       var email1=req.body.email;
       var address1=req.body.address;
    var phone1=req.body.phone
    var city1=req.body.city;
    if(id!=null){
        req.getConnection(function(error,conn){
            conn.query('UPDATE studentregi SET `name`=?,`email`=?,`address`=?,`phone`=?,`city`=? WHERE id=5',[name1,email1,address1,phone1,city1,id1],function(err,rows,fields){
                if(error){
                    res.status(500)
                    res.send(JSON.stringify({success:false,message:error.message}))
                }else{
                    if(rows.length>0){
                      
                            res.send(JSON.stringify({success:false,result:"Update Success",data:rows}))
                       
                    }else{
                        res.send(JSON.stringify({success:false,message:"Empty"}))
                    }
                }
            })
        })
    
    }else{
        res.send(JSON.stringify({success: false,message:"Missing Feild Please Check Userid"}))
    }
    })





   //blog 320 project restaudant

   router.get('/categoryname',function(req,res,next){
    //slider
   // if(req.query.key==API_KEY){
  // var fbid=req.query.fbid
  // if(fbid!=null){
    req.getConnection(function(error,conn){
        conn.query('SELECT * FROM categorynamefood',function(err,rows,fields){
            if(error){
                res.status(500)
                res.send(JSON.stringify({success:false,message:error.message}))
            }else{
                if(rows.length>0){
                    res.send(JSON.stringify({success:true,category:rows}))
                }else{
                    res.send(JSON.stringify({success:false,message:"Empty"}))
                }
            }
        })
    })
})

router.get('/youtubeurl',function(req,res,next){
    //slider
   // if(req.query.key==API_KEY){
  // var fbid=req.query.fbid
  // if(fbid!=null){
    req.getConnection(function(error,conn){
        conn.query('SELECT * FROM youtubeurl',function(err,rows,fields){
            if(error){
                res.status(500)
                res.send(JSON.stringify({success:false,message:error.message}))
            }else{
                if(rows.length>0){
                    res.send(JSON.stringify({success:true,data:rows}))
                }else{
                    res.send(JSON.stringify({success:false,message:"Empty"}))
                }
            }
        })
    })
})

router.get('/pdfurl',function(req,res,next){
    //slider
   // if(req.query.key==API_KEY){
  // var fbid=req.query.fbid
  // if(fbid!=null){
    req.getConnection(function(error,conn){
        conn.query('SELECT * FROM pdfurl',function(err,rows,fields){
            if(error){
                res.status(500)
                res.send(JSON.stringify({success:false,message:error.message}))
            }else{
                if(rows.length>0){
                    res.send(JSON.stringify({success:true,data:rows}))
                }else{
                    res.send(JSON.stringify({success:false,message:"Empty"}))
                }
            }
        })
    })
})
   
router.get('/restaurants_name',function(req,res,next){
    //slider
   // if(req.query.key==API_KEY){
  // var fbid=req.query.fbid
  // if(fbid!=null){
    req.getConnection(function(error,conn){
        conn.query('SELECT * FROM restaurants_name',function(err,rows,fields){
            if(error){
                res.status(500)
                res.send(JSON.stringify({success:false,message:error.message}))
            }else{
                if(rows.length>0){
                    res.send(JSON.stringify({success:true,restaurants_name:rows}))
                }else{
                    res.send(JSON.stringify({success:false,message:"Empty"}))
                }
            }
        })
    })
})



//tiktok video

router.get('/tiktokvideo',function(req,res,next){
    //slider
   // if(req.query.key==API_KEY){
  // var fbid=req.query.fbid
  // if(fbid!=null){
    req.getConnection(function(error,conn){
        conn.query('SELECT * FROM tiktokvideo',function(err,rows,fields){
            if(error){
                res.status(500)
                res.send(JSON.stringify({success:false,message:error.message}))
            }else{
                if(rows.length>0){
                    res.send(JSON.stringify({success:true,data:rows}))
                }else{
                    res.send(JSON.stringify({success:false,message:"Empty"}))
                }
            }
        })
    })
})


router.post('/youtubelinkupload',function(req,res,next){
    var link1=req.body.link
   
        req.getConnection(function(error,conn){
            conn.query('INSERT INTO youtubeurl(youtubeurl) VALUES(?)',[link1],function(err,rows,fields){
                if(error){
                    res.status(500)
                    res.send(JSON.stringify({success:false,message:error.message}))
                }else{
                    if(rows.affectedRows>0){
                        res.send(JSON.stringify({success:true,message:"Success"}))
  
                    }
                }
            })
        })
    })

    router.post('/pdfurl',function(req,res,next){
        var link1=req.body.link
       
            req.getConnection(function(error,conn){
                conn.query('INSERT INTO pdfurl(pdfurl) VALUES(?)',[link1],function(err,rows,fields){
                    if(error){
                        res.status(500)
                        res.send(JSON.stringify({success:false,message:error.message}))
                    }else{
                        if(rows.affectedRows>0){
                            res.send(JSON.stringify({success:true,message:"Success"}))
      
                        }
                    }
                })
            })
        })
  

module.exports=router