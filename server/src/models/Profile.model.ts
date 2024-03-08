import mongoose, { Schema } from 'mongoose';

export interface ProfileProperties {
  username: string;
  customize: any;
  stats: any;
  history: any;
}

export type ProfileInterface = ProfileProperties & Document;

const profileSchema = new Schema({
  username: { type: String, required: true, unique: true },
  customize: {
    caretStyle: String,
    inputWidth: Number,
    liveAccuracy: Boolean,
    liveWpm: Boolean,
    smoothCaret: Boolean,
    soundOnClick: Boolean,
    theme: String,
  },
  stats: { type: mongoose.SchemaTypes.Mixed },
  history: { type: mongoose.SchemaTypes.Mixed },
});

const Profile = mongoose.model<ProfileInterface>('Profile', profileSchema);

export default Profile;
