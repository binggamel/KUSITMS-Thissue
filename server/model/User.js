const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10 //salt의 길이
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    //이메일,이름,연락처,생년월일,성별,비번
    email: {
        type: String,
        trim: true, //공백 제거
        unique: 1,
        required: true,
    },
    name: {
        type: String,
        maxlength: 50,
        required: true,
    },
    phonenumber: {
        type: Number,
    },
    birthday: {
        type: Date,
        default: Date.now(),
    },
    sex: {
        type: String,
        enum: ["M", "F"]
    },
    password: {
        type: String,
        minlength: 5,
        trim: true,
        required: true,
    },
    image: String,
    token: { //유효성 관리
        type: String
    },
    tokenExp: { //유효기간
        type: Number
    }
})

//유저 모델을 저장하기 전에 비밀번호 암호화
userSchema.pre('save', function(next){
    var user=this;
    if(user.isModified('password')){ //다른 데이터가 아닌 비밀번호를 바꿀 때만 비밀번호 암호화
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash
                next()
            });
        });
    } else{
        next()
    }
})

//plainPassword를 암호화한 다음 DB의 password와 비교
userSchema.methods.comparePassword = function(plainPassword, cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    })
}
userSchema.methods.generateToken = function(cb){
    //Token 만들어서
    var user=this;
    var token=jwt.sign(user._id.toHexString(), 'secretToken')

    //생성한 Token을 User에 넣음
    user.token=token;
    user.tokenExp=oneHour;
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}

//Authentication
userSchema.statics.findByToken = function(token, cb){
    var user=this;

    //토큰 복호화
    jwt.verify(token, 'secretToken', function(err, decoded) {
        user.findOne({"_id": decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports={ User }