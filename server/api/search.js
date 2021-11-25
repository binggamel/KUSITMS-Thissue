const express = require('express');
const router = express.Router();

//db 어케가져와야대여
router.get('/search', (req, res)=>{
    // req.query:서버에서 query string 꺼내서
    //console.log(req.query);
    db.collection('post').find({ title:req.query.value }).toArray((err, result)=>{
        console.log(result);
        //res.render('search.ejs',{ posts: result })
    })
})

//[front에서]
// $('#search').click(function(){
//     var 입력한값=$('#search-input').val();
//     window.location.replace('/search?value='+사용자가입력한거);
// })

module.exports = router;
