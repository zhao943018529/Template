const router = require('express').Router();

const categories =[
    {
        id:111,
        name:'Javascript',
        displayName:'Javascript',
        description:'best program language',
    },
    {
        id:222,
        name:'PHP',
        displayName:'PHP',
        description:'shit',
    },
    {
        id:333,
        name:'Lisp',
        displayName:'Lisp',
        description:'misterious',
    },
    {
        id:444,
        name:'OCaml',
        displayName:'OCaml',
        description:'cool',
    },
];

router.get('/getAll',function(req,res){
    res.json({
        status: 200,
        data: categories,
    });
});

module.exports = router;