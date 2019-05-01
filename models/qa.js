const mongoose = require('mongoose');

const { Schema } = mongoose;

const qaSchema = new Schema({
  questAns: {
    questionText: String,
    answerText: String,
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
},
{
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
});

const Qa = mongoose.model('Qa', qaSchema);

module.exports = Qa;
