const express = require('express');
const mongoose = require('mongoose')
const Grade = mongoose.model('Grade');

const router = express.Router();

const { check, validationResult } = require('express-validator');

router.get('/', (req, res) => {
    res.render('index', { title: 'Grade Registration App' });
});

router.get('/add', (req, res) => {
    res.render('form', { title: 'Add Grades' });
});

router.post('/add',
    [
        check('date')
            .isDate()
            .withMessage('Please enter a date'),
        check('module')
            .isLength({ min: 3 })
            .withMessage('Plase enter a module name'),
        check('grade')
            .isFloat({ min: 1, max: 6 })
            .withMessage('Please enter grade between 1 and 6')
    ], async function (req, res)  {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            const grade = new Grade(req.body);
            grade.save()
                .then(() => {
                    res.render('form', { title: 'Add Grades' }); })
                .catch((err) => {
                    console.log(err);
                    res.send('Something went wrong.');
                });
        } else {
            res.render('form', {
                title: 'Add Grades',
                errors: errors.array(),
                data: req.body
            });
        }
        console.log(req.body);
    });

router.get('/grades', (req, res) => {
    Grade.find()
        .then((grades) => {
            res.render('grades', { title: 'Grades grades', grades });
})
    .catch(() => { res.send('Sorry, something went wrong.') });
});

router.get('/statistics', async (req, res) => {
    max = await Grade.find().sort({grade:-1}).limit(1).lean();
    min = await Grade.find().sort({grade:+1}).limit(1);
    avg = await Grade.aggregate([
        {
          $group: {
            _id: null,
            'avg': {
              $avg: "$grade"
            }
          }
        }
      ]);
    cnt = await Grade.countDocuments();
    res.render('statistics', {title: 'Statistics', max, min, avg, cnt});
});

module.exports = router;