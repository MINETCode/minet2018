var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({

  username: String,
  email: String,
  password: String,
  schoolName: String,
  cryptxLevel: {
    type: Number,
    default: 0
  },
  lastLevelOn: {
    type: Date,
    default: Date.now
  },
  firstUse: {
    type: Number,
    default: 1
  },
  funds: {
    type: Number,
    default: 0
  },
  slack: {
    email: {
      type: String,
      default: ''
    },
    password: {
      type: String,
      default: ''
    }
  },
  team: {
    design: {
      isEvent: {
        type: Number,
        default: 1
      },
      funds: {
        type: Number,
        default: 0
      },
      p1: {
        name: {
          type: String,
          default: ''
        },
        email: {
          type: String,
          default: ''
        },
        imageURL: {
          type: String,
          default: ''
        },
      },
      p2: {
        name: {
          type: String,
          default: ''
        },
        email: {
          type: String,
          default: ''
        },
        imageURL: {
          type: String,
          default: ''
        },
      },
      p3: {
        name: {
          type: String,
          default: ''
        },
        email: {
          type: String,
          default: ''
        },
        imageURL: {
          type: String,
          default: ''
        },
      }
    },
    quiz: {
      isEvent: {
        type: Number,
        default: 1
      },
      funds: {
        type: Number,
        default: 0
      },
      p1: {
        name: {
          type: String,
          default: ''
        },
        email: {
          type: String,
          default: ''
        },
        imageURL: {
          type: String,
          default: ''
        },
      },
      p2: {
        name: {
          type: String,
          default: ''
        },
        email: {
          type: String,
          default: ''
        },
        imageURL: {
          type: String,
          default: ''
        },
      }
    },
    programming: {
      isEvent: {
        type: Number,
        default: 1
      },
      funds: {
        type: Number,
        default: 0
      },
      p1: {
        name: {
          type: String,
          default: ''
        },
        email: {
          type: String,
          default: ''
        },
        imageURL: {
          type: String,
          default: ''
        },
      },
      p2: {
        name: {
          type: String,
          default: ''
        },
        email: {
          type: String,
          default: ''
        },
        imageURL: {
          type: String,
          default: ''
        },
      }
    },
    gaming: {
      isEvent: {
        type: Number,
        default: 1
      },
      funds: {
        type: Number,
        default: 0
      },
      p1: {
        name: {
          type: String,
          default: ''
        },
        email: {
          type: String,
          default: ''
        },
        imageURL: {
          type: String,
          default: ''
        },
      },
      p2: {
        name: {
          type: String,
          default: ''
        },
        email: {
          type: String,
          default: ''
        },
        imageURL: {
          type: String,
          default: ''
        },
      }
    },
    pitching: {
      isEvent: {
        type: Number,
        default: 1
      },
      funds: {
        type: Number,
        default: 0
      },
      p1: {
        name: {
          type: String,
          default: ''
        },
        email: {
          type: String,
          default: ''
        },
        imageURL: {
          type: String,
          default: ''
        },
      }
    },
    surprise: {
      isEvent: {
        type: Number,
        default: 1
      },
      funds: {
        type: Number,
        default: 0
      },
      p1: {
        name: {
          type: String,
          default: ''
        },
        email: {
          type: String,
          default: ''
        },
        imageURL: {
          type: String,
          default: ''
        },
      },
      p2: {
        name: {
          type: String,
          default: ''
        },
        email: {
          type: String,
          default: ''
        },
        imageURL: {
          type: String,
          default: ''
        },
      }
    }
  },
  startup: {
    name: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    industry: {
      type: String,
      default: ''
    },
    imageURL: {
      type: String,
      default: ''
    },
  }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
