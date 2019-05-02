const mongoose = require('mongoose');

const { Schema } = mongoose;

const formSchema = new Schema({
  codingStatus: { type: String, default: 'Fill your daily form and see your status here' },
  getBetter: { type: String, default: 'Fill your daily form' },
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
