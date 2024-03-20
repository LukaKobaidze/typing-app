import mongoose, { Schema } from 'mongoose';

type StatsAverageType = {
  wpm: number;
  accuracy: number;
  raw: number;
};

export interface ProfileProperties {
  username: string;
  customize: {
    liveWpm: boolean;
    liveAccuracy: boolean;
    smoothCaret: boolean;
    soundOnClick: boolean;
    inputWidth: number;
    fontSize: number;
    caretStyle: string;
    theme: string;
  };
  stats: {
    testsStarted?: number;
    testsCompleted?: number;
    average?: StatsAverageType;
    highest?: StatsAverageType;
  };
  history: {
    timeline: { wpm: number; accuracy: number; raw: number; second: number }[];
    errors: number;
    testType: string;
    date: string;
    quoteAuthor?: string;
  }[];
}
export type ProfileInterface = ProfileProperties & Document;

const statsAverageSchemaType = {
  wpm: Number,
  accuracy: Number,
  raw: Number,
};
const profileSchema = new Schema({
  username: { type: String, required: true, unique: true },
  customize: {
    caretStyle: String,
    inputWidth: Number,
    fontSize: Number,
    liveAccuracy: Boolean,
    liveWpm: Boolean,
    smoothCaret: Boolean,
    soundOnClick: Boolean,
    theme: String,
  },
  stats: {
    testsStarted: Number,
    testsCompleted: Number,
    average: statsAverageSchemaType,
    highest: statsAverageSchemaType,
  },
  history: [
    {
      timeline: {
        type: [{ wpm: Number, accuracy: Number, raw: Number, second: Number }],
        required: true,
      },
      errors: { type: Number, required: true },
      testType: { type: String, required: true },
      date: { type: Date, required: true },
      quoteAuthor: { type: String },
    },
  ],
});

const Profile = mongoose.model<ProfileInterface>('Profile', profileSchema);

export default Profile;
