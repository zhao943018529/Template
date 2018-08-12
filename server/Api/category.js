const router = require('express').Router();

const categories =[
    {
        id:100,
        name:'Home',
        prefix:'channel',
        displayName:'Home',
        description:'index page',
    },
    {
        id:111,
        name:'Javascript',
        prefix:'channel',
        displayName:'Javascript',
        description:'best program language',
    },
    {
        id:222,
        name:'PHP',
        prefix:'channel',
        displayName:'PHP',
        description:'shit',
    },
    {
        id:333,
        name:'Lisp',
        prefix:'channel',
        displayName:'Lisp',
        description:'misterious',
    },
    {
        id:444,
        name:'OCaml',
        prefix:'channel',
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