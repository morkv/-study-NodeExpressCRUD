const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../members');

// Gets all members
router.get('/', (req, res) => res.json(members));

// Get single member
router.get('/:id', (req, res) =>  {
    const found = members.some(member => member.id === parseInt(req.params.id));
    
    if(found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({
            msg: `No member with the id of ${req.params.id}`
        })
    }
});

// Create member
router.post('/', (req, res) => {
    // res.send(req.body)
    const newMember = {
        // if we used DB => id created for me
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    };
    
    // Check name & email
    if(!newMember.name || !newMember.email) {
        return res.status(400).json({
            msg: `Please include a name & email`
        })
    }

    members.push(newMember);
    res.json(members);
    // for form
    // res.redirect('/');
});

// Update member
router.put('/:id', (req, res) =>  {
    const found = members.some(member => member.id === parseInt(req.params.id));
    
    if(found) {
        const updMember = req.body;
        members.forEach( member => {
            if(member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;
                res.json({
                    msg: 'Member updated',
                    member
                });
            }
        });
    } else {
        res.status(400).json({
            msg: `No member with the id of ${req.params.id}`
        })
    }
});

// Delete member
router.delete('/:id', (req, res) =>  {
    const found = members.some(member => member.id === parseInt(req.params.id));
    
    if(found) {
        res.json(
            { 
                msg: 'Member deleted',
                members: members.filter(member => member.id !== parseInt(req.params.id))
            });
    } else {
        res.status(400).json({
            msg: `No member with the id of ${req.params.id}`
        })
    }
});

module.exports = router;