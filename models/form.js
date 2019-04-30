const mongoose = require('mongoose');

const { Schema } = mongoose;

const formSchema = new Schema({
  codingStatus: Number,
  getBetter: String,
  questAns: {
    questionText: String,
    answerText: String,
  },
  journal: String,
  usedTools: {
    htmlRange: Number,
    cssRange: Number,
    jsRange: Number,
    mongoRange: Number,
    reactRange: Number,
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
},
{
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
