import { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId, // a user from the database type
    ref: 'User',  // One to many relationship with a user
  },
  prompt: {
    type: String,
    required: [true,'Prompt is required'],
  },
  tag: {
    type: String,
    required: [true,'Tag is required'],
  },  
})

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;