export default {
    'text': { type: String },
    'imageUrl': { type: Array },
    'postTime': { type: Date, default: Date.now },
    'location': { type: String },
    'type': { type: String, require: true },
    'posterImageUrl': { type: String },
    'videoUrl': { type: String },
}
