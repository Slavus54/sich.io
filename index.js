const app = require('express')()
const server = require('http').createServer(app).listen(5000)
const {Server} = require('socket.io')
const {gql} = require('apollo-server-express')

const PORT = process.env.PORT || 4000


// schemas

const Profiles = require('./schemas/Profiles')
const Areas = require('./schemas/Areas')
const Persons = require('./schemas/Persons')
const Meetings = require('./schemas/Meetings')

// microservices

const {middleware, mongo_connect, apollo_start, slicer, get_id, manage_password, generate_pdf} = require('./libs/microservices')

// database url

const url = 'mongodb+srv://Slavus54:ieOUiW5CNwW5gQ5D@web-2024.v43n3ay.mongodb.net/Sich-IO'

// middlewares

middleware(app)
mongo_connect(url, 'MongoDB is connected...')

const typeDefs = gql`
    type Query {
        test: String!
    }
    type Cord {
        lat: Float!,
        long: Float!
    }
    input ICord {
        lat: Float!,
        long: Float!
    }
    type UserCookie {
        account_id: String!,
        username: String!,
        isRefugee: Boolean!,
        volume: Float!
    }
    type Media {
        label: String!,
        icon: String!,
        url: String!
    }
    type AccountComponent {
        shortid: String!,
        title: String!,
        path: String!
    }
    type Bill {
        shortid: String!,
        label: String!,
        category: String!,
        cost: Float!,
        photo_url: String!,
        likes: Float!
    }
    type Damage {
        shortid: String!,
        name: String!,
        label: String!,
        category: String!,
        isKilled: Boolean!,
        photo_url: String!,
        cords: Cord!,
        trust_points: Float!
    }
    type Fact {
        shortid: String!,
        name: String!,
        text: String!,
        level: String!,
        isTrue: Boolean!
    }
    type Question {
        shortid: String!,
        name: String!,
        text: String!,
        category: String!,
        level: String!,
        variants: [String]!,
        right_answer: String!
    }
    type Homestead {
        shortid: String!,
        name: String!,
        title: String!,
        format: String!,
        photo_url: String!,
        cords: Cord!,
        likes: Float!
    }
    type Demand {
        id: String!,
        label: String!,
        level: String!,
        status: String!
    }
    input IDemand {
        id: String!,
        label: String!,
        level: String!,
        status: String!
    }
    type Member {
        account_id: String!,
        name: String!,
        role: String!
    }
    type Chat {
        name: String!,
        variant: String!,
        text: String!
    }
    type Waypoint {
        shortid: String!,
        name: String!,
        title: String!,
        category: String!,
        photo_url: String!,
        cords: Cord!,
        voters: [String]!,
        rate: Float!
    }
    type Meeting {
        id: ID!,
        shortid: String!,
        account_id: String!,
        username: String!,
        title: String!,
        category: String!,
        region: String!,
        cords: Cord!,
        demands: [Demand]!,
        date_up: String!,
        time: String!,
        members: [Member]!,
        chat: [Chat]!,
        waypoints: [Waypoint]!
    }
    type Person {
        id: ID!,
        shortid: String!,
        account_id: String!,
        username: String!,
        fullname: String!,
        category: String!,
        century: String!,
        region: String!,
        cords: Cord!,
        age: Float!,
        day_quote: String!,
        questions: [Question]!,
        homesteads: [Homestead]!
    }
    type Area {
        id: ID!,
        shortid: String!,
        account_id: String!,
        username: String!,
        title: String!,
        category: String!,
        region: String!,
        cords: Cord!,
        status: String!,
        assault_points: Float!,
        damages: [Damage]!,
        facts: [Fact]!
    }
    type Profile {
        account_id: String!,
        username: String!,
        password: String!,
        region: String!,
        cords: Cord!,
        isRefugee: Boolean!,
        percent: Float!,
        main_photo: String!,
        volume: Float!,
        media: [Media]!,
        bills: [Bill]!,
        account_components: [AccountComponent]!
    }
    type Mutation {
        register(username: String!, password: String!, region: String!, cords: ICord!, isRefugee: Boolean!, percent: Float!, main_photo: String!) : UserCookie!
        login(username: String!, password: String!) : UserCookie!
        getProfiles(username: String!) : [Profile]!
        getProfile(account_id: String!) : Profile!
        updateProfileInfo(account_id: String!, username: String!, region: String!, cords: ICord!, percent: Float!, main_photo: String!) : String!
        secureProfile(account_id: String!, password: String!) : String!
        manageProfileMedia(account_id: String!, option: String!, label: String!, icon: String!, url: String!) : String!
        manageProfileBill(account_id: String!, option: String!, label: String!, category: String!, cost: Float!, volume: Float!, photo_url: String!, coll_id: String!) : String!
        manageProfileVolume(account_id: String!, option: String!, volume: Float!) : UserCookie!
        createArea(username: String!, id: String!, title: String!, category: String!, region: String!, cords: ICord!, status: String!, assault_points: Float!) : String!
        getAreas(username: String!) : [Area]!
        getArea(username: String!, shortid: String!) : Area!
        manageAreaDamage(username: String!, id: String!, option: String!, label: String!, category: String!, isKilled: Boolean!, photo_url: String!, cords: ICord!, trust_points: Float!, coll_id: String!) : String!
        updateAreaInfo(username: String!, id: String!, status: String!, assault_points: Float!) : String!
        makeAreaFact(username: String!, id: String!, text: String!, level: String!, isTrue: Boolean!) : String!
        createPerson(username: String!, id: String!, fullname: String!, category: String!, century: String!, region: String!, cords: ICord!, age: Float!, day_quote: String!) : String!
        getPersons(username: String!) : [Person]!
        getPerson(username: String!, shortid: String!) : Person!
        makePersonQuestion(username: String!, id: String!, text: String!, category: String!, level: String!, variants: [String]!, right_answer: String!) : String!
        managePersonHomestead(username: String!, id: String!, option: String!, title: String!, format: String!, photo_url: String!, cords: ICord!, coll_id: String!) : String!
        updatePersonQuote(username: String!, id: String!, day_quote: String!) : String!
        createMeeting(username: String!, id: String!, title: String!, category: String!, region: String!, cords: ICord!, demands: [IDemand]!, date_up: String!, time: String!, role: String!) : String!
        getMeetings(username: String!) : [Meeting]!
        getMeeting(username: String!, shortid: String!) : Meeting!
        manageMeetingStatus(username: String!, id: String!, option: String!, role: String!) : String!
        updateMeetingDemand(username: String!, id: String!, coll_id: String!, status: String!) : String!
        manageMeetingWaypoint(username: String!, id: String!, option: String!, title: String!, category: String!, photo_url: String!, cords: ICord!, coll_id: String!, isVoteFor: Boolean!) : String!
    }
`

const resolvers = {
    Query: {
        test: () => 'Hi'
    },
    Mutation: {
        register: async (_, {username, password, region, cords, isRefugee, percent, main_photo}) => {
            const profile = await Profiles.findOne({username}) 
            let drop_object = {account_id: '', username, isRefugee, volume: 0}

            if (profile === null) {

                let account_id = get_id()
                let hash = await manage_password(password, true, {})

                const newProfile = new Profiles({
                    account_id,
                    username,
                    password: hash.data.password,
                    region,
                    cords,
                    isRefugee,
                    percent,
                    main_photo,
                    volume: 0,
                    media: [],
                    bills: [],
                    account_components: []
                })

                drop_object = {account_id, username, isRefugee, volume: 0}
                
                await newProfile.save()
            } 
        
            return drop_object
        },
        login: async (_, {username, password}) => {
            const profile = await Profiles.findOne({username}) 
            let drop_object = {account_id: '', username: '', isRefugee: false, volume: 0}

            if (profile) {
                let data = await manage_password(password, false, profile)
   
                if (data.flag) {
                    drop_object = {account_id: profile.account_id, username: profile.username, isRefugee: profile.isRefugee, volume: profile.volume}     
                }                           
            }

            return drop_object
        },
        getProfiles: async (_, {username}) => {
            const profiles = await Profiles.find() 

            return profiles
        },
        getProfile: async (_, {account_id}) => {
            const profile = await Profiles.findOne({account_id}) 
            
            return profile
        },
        updateProfileInfo: async (_, {account_id, username, region, cords, percent, main_photo}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {
            
                const changed_name = await Profiles.findOne({username}) 
                
                if (profile.username !== username && !changed_name) {
                    profile.username = username
                }
                
                profile.region = region
                profile.cords = cords 
                profile.percent = percent
                profile.main_photo = main_photo

                await Profiles.updateOne({account_id}, {$set: profile})

                return 'Success'
            } 

            return 'Error'
        },
        manageProfileMedia: async (_, {account_id, option, label, icon, url}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {
                if (option === 'create') {

                    profile.media = [...profile.media, {
                        label,
                        icon,
                        url
                    }]

                } else {

                    profile.media = profile.media.filter(el => el.label !== label)
                }

                await Profiles.updateOne({account_id}, {$set: profile})

                return 'Success'
            } 

            return 'Error'
        },
        manageProfileBill: async (_, {account_id, option, label, category, cost, volume, photo_url, coll_id}) => {
            const profile = await Profiles.findOne({account_id}) 
        
            if (profile) {
                if (option === 'create') {

                    let shortid = get_id()

                    profile.bills = [...profile.bills, {
                        shortid,
                        label,
                        category,
                        cost,
                        photo_url,
                        likes: 0
                    }]

                    profile.bills = slicer(profile.bills, 25)
                    profile.volume += volume

                } else if (option === 'like') {

                    profile.bills.map(el => {
                        if (el.shortid === coll_id) {
                            el.likes += 1
                        }
                    })

                } else {

                    profile.bills = profile.bills.filter(el => el.shortid !== coll_id)
                }

                await Profiles.updateOne({account_id}, {$set: profile})

                return 'Success'
            } 

            return 'Error'
        },
        manageProfileVolume: async (_, {account_id, option, volume}) => {
            const profile = await Profiles.findOne({account_id}) 
            let drop_object = {account_id: '', username: '', isRefugee: false, volume: 0}

            if (profile) {
                if (option === 'earn') {
                    profile.volume += volume
                } else {
                    profile.volume -= volume
                }
               
                await Profiles.updateOne({account_id}, {$set: profile})
                
                drop_object = {account_id: profile.account_id, username: profile.username, isRefugee: profile.isRefugee, volume: profile.volume}     
            }

            return drop_object
        },
        createArea: async (_, {username, id, title, category, region, cords, status, assault_points}) => {
            const profile = await Profiles.findOne({username, account_id: id}) 
            const area = await Areas.findOne({username, title, category, region, cords, status})

            if (profile && !area) {
                if (profile.account_components.filter(el => el.path === 'area').find(el => el.title === title) === undefined) {

                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title,
                        path: 'area'
                    }]

                    const newArea = new Areas({
                        shortid,
                        account_id: profile.account_id,
                        username: profile.username,
                        title,
                        category,
                        region,
                        cords,
                        status,
                        assault_points,
                        damages: [],
                        facts: []
                    })

                    await Profiles.updateOne({username, account_id: id}, {$set: profile})
                    await newArea.save()

                    return 'Success'
                }
            }

            return 'Error'
        },
        getAreas: async (_, {username}) => {
            const areas = await Areas.find()

            return areas
        },
        getArea: async (_, {username, shortid}) => {
            const area = await Areas.findOne({shortid})

            return area
        },
        manageAreaDamage: async (_, {username, id, option, label, category, isKilled, photo_url, cords, trust_points, coll_id}) => {
            const profile = await Profiles.findOne({username})
            const area = await Areas.findOne({shortid: id})

            if (profile && area) {
                if (option === 'create') {

                    let shortid = get_id()
                    
                    area.damages = [...area.damages, {
                        shortid,
                        name: profile.username,
                        label,
                        category,
                        isKilled,
                        photo_url,
                        cords,
                        trust_points
                    }]

                    area.damages = slicer(area.damages, 25)

                } else if (option === 'update') {

                    area.damages.map(el => {
                        if (el.shortid === coll_id) {
                            el.trust_points = trust_points
                        }
                    })                    

                } else {

                    area.damages = area.damages.filter(el => el.shortid !== coll_id)
                }

                await Areas.updateOne({shortid: id}, {$set: area})

                return 'Success'
            }

            return 'Error'
        },
        updateAreaInfo: async (_, {username, id, status, assault_points}) => {
            const profile = await Profiles.findOne({username})
            const area = await Areas.findOne({shortid: id})

            if (profile && area) {

                area.status = status
                area.assault_points = assault_points
                
                await Areas.updateOne({shortid: id}, {$set: area})

                return 'Success'
            }

            return 'Error'
        },
        makeAreaFact: async (_, {username, id, text, level, isTrue}) => {
            const profile = await Profiles.findOne({username})
            const area = await Areas.findOne({shortid: id})

            if (profile && area) {
                
                let shortid = get_id()

                area.facts = [...area.facts, {
                    shortid,
                    name: profile.username,
                    text,
                    level,
                    isTrue
                }]

                area.facts = slicer(area.facts, 25)

                await Areas.updateOne({shortid: id}, {$set: area})

                return 'Success'
            }

            return 'Error'
        },
        createPerson: async (_, {username, id, fullname, category, century, region, cords, age, day_quote}) => {
            const profile = await Profiles.findOne({username, account_id: id})
            const person = await Persons.findOne({username, fullname, category, century, region, cords, age, day_quote})
        
            if (profile && !person) {
                if (profile.account_components.filter(el => el.path === 'person').find(el => el.title === fullname) === undefined) {

                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title: fullname,
                        path: 'person'
                    }]

                    const newPerson = new Persons({
                        shortid,
                        account_id: profile.account_id,
                        username: profile.username,
                        fullname,
                        category,
                        century,
                        region,
                        cords,
                        age,
                        day_quote,
                        questions: [],
                        homesteads: []
                    })

                    await Profiles.updateOne({username, account_id: id}, {$set: profile})
                    await newPerson.save()

                    return 'Success'
                }
            }

            return 'Error'
        },
        getPersons: async (_, {username}) => {
            const persons = await Persons.find()

            return persons
        },
        getPerson: async (_, {username, shortid}) => {
            const person = await Persons.findOne({shortid})

            return person
        },
        makePersonQuestion: async (_, {username, id, text, category, level, variants, right_answer}) => {
            const profile = await Profiles.findOne({username})
            const person = await Persons.findOne({shortid: id})
        
            if (profile && person) {
                
                let shortid = get_id()
                
                person.questions = [...person.questions, {
                    shortid,
                    name: profile.username,
                    text,
                    category,
                    level,
                    variants,
                    right_answer
                }]

                person.questions = slicer(person.questions, 25)

                await Persons.updateOne({shortid: id}, {$set: person})

                return 'Success'
            }

            return 'Error'
        },
        managePersonHomestead: async (_, {username, id, option, title, format, photo_url, cords, coll_id}) => {
            const profile = await Profiles.findOne({username})
            const person = await Persons.findOne({shortid: id})
        
            if (profile && person) {
                if (option === 'create') {

                    let shortid = get_id()
                    
                    person.homesteads = [...person.homesteads, {
                        shortid,
                        name: profile.username,
                        title,
                        format,
                        photo_url,
                        cords,
                        likes: 0
                    }]

                } else if (option === 'like') {

                    person.homesteads.map(el => {
                        if (el.shortid === coll_id) {
                            el.likes += 1
                        }
                    })

                } else {

                    person.homesteads = person.homesteads.filter(el => el.shortid !== coll_id)
                }
                
                await Persons.updateOne({shortid: id}, {$set: person})

                return 'Success'
            }

            return 'Error'
        },
        updatePersonQuote: async (_, {username, id, day_quote}) => {
            const profile = await Profiles.findOne({username})
            const person = await Persons.findOne({shortid: id})
        
            if (profile && person) {

                person.day_quote = day_quote
                
                await Persons.updateOne({shortid: id}, {$set: person})

                return 'Success'
            }

            return 'Error'
        },
        createMeeting: async (_, {username, id, title, category, region, cords, demands, date_up, time, role}) => {
            const profile = await Profiles.findOne({username, account_id: id})
            const meeting = await Meetings.findOne({username, title, category, region, cords, date_up, time})

            if (profile && !meeting) {
                if (profile.account_components.filter(el => el.path === 'meeting').find(el => el.title === title) === undefined) {

                    let shortid = get_id()

                    profile.volume += 5

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title,
                        path: 'meeting'
                    }]

                    const newMeeting = new Meetings({
                        shortid,
                        account_id: profile.account_id,
                        username: profile.username,
                        title,
                        category,
                        region,
                        cords,
                        demands,
                        date_up,
                        time,
                        members: [{
                            account_id: profile.account_id,
                            name: profile.username,
                            role
                        }],
                        chat: [],
                        waypoints: []
                    })

                    await Profiles.updateOne({username, account_id: id}, {$set: profile})
                    await newMeeting.save()

                    return 'Success'
                }
            } 

            return 'Error'
        },
        getMeetings: async (_, {username}) => {
            const meetings = await Meetings.find()

            return meetings
        },
        getMeeting: async (_, {username, shortid}) => {
            const meeting = await Meetings.findOne({shortid})

            return meeting
        },
        manageMeetingStatus: async (_, {username, id, option, role}) => {
            const profile = await Profiles.findOne({username})
            const meeting = await Meetings.findOne({shortid: id})
        
            if (profile && meeting) {
                if (option === 'join') {

                    profile.volume += 2

                    profile.account_components = [...profile.account_components, {
                        shortid: meeting.shortid,
                        title: meeting.title,
                        path: 'meeting'
                    }]

                    meeting.members = [...meeting.members, {
                        account_id: profile.account_id,
                        name: profile.username,
                        role
                    }]

                } else if (option === 'update') {

                    meeting.members.map(el => {
                        if (el.account_id === profile.account_id) {
                            el.role = role
                        }
                    })

                } else {

                    profile.account_components =  profile.account_components.filter(el => el.shortid !== meeting.shortid)

                    meeting.members = meeting.members.filter(el => el.account_id !== profile.account_id)
                }

                await Profiles.updateOne({username}, {$set: profile})
                await Meetings.updateOne({shortid: id}, {$set: meeting})

                return 'Success'
            }

            return 'Error'
        },
        updateMeetingDemand: async (_, {username, id, coll_id, status}) => {
            const profile = await Profiles.findOne({username})
            const meeting = await Meetings.findOne({shortid: id})
        
            if (profile && meeting) {

                meeting.demands.map(el => {
                    if (el.id === coll_id) {
                        el.status = status
                    }
                })
                
                await Meetings.updateOne({shortid: id}, {$set: meeting})

                return 'Success'
            }

            return 'Error'
        },
        manageMeetingWaypoint: async (_, {username, id, option, title, category, photo_url, cords, coll_id, isVoteFor}) => {
            const profile = await Profiles.findOne({username})
            const meeting = await Meetings.findOne({shortid: id})
        
            if (profile && meeting) {
                if (option === 'create') {

                    let shortid = get_id()

                    meeting.waypoints = [...meeting.waypoints, {
                        shortid,
                        name: profile.username,
                        title,
                        category,
                        photo_url,
                        cords,
                        voters: [profile.username],
                        rate: 1
                    }]  

                    meeting.waypoints = slicer(meeting.waypoints, 25)

                } else if (option === 'vote') {

                    meeting.waypoints.map(el => {
                        if (el.shortid === coll_id) {
                            el.rate = isVoteFor ? el.rate + 1 : el.rate - 1

                            el.voters = [...el.voters, profile.username]
                        }
                    })

                } else {

                    meeting.waypoints = meeting.waypoints.filter(el => el.shortid !== coll_id)
                }
            
                await Meetings.updateOne({shortid: id}, {$set: meeting})

                return 'Success'
            }

            return 'Error'
        }




      
    }
}

apollo_start(typeDefs, resolvers, app)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
})

io.on('connection', socket => {
    
    console.log('Connect Socket.IO...')

    socket.on('chat-join', async (message) => {
        let meeting = await Meetings.findOne({shortid: message.shortid})

        socket.broadcast.emit('welcome-back', `Welcome to Meeting Chat, ${message.username}!`)

        if (meeting) {  
            socket.broadcast.emit('messages', meeting.chat)
        }       
    })

    socket.on('send-message', async (message) => {
        let meeting = await Meetings.findOne({shortid: message.shortid})
      
        if (meeting) {
            meeting.chat = [...meeting.chat, {
                name: message.username,
                variant: message.variant,
                text: message.text
            }]
         
            socket.broadcast.emit('messages', meeting.chat)
           
            await Meetings.updateOne({shortid: message.shortid}, {$set: meeting})           
        }
    })

    socket.on('disconnect', () => {
        console.log('Disconnected...')
    })
})

app.post('/update-password', async (req, res) => {
    let {account_id, password, flag} = req.body
    const profile = await Profiles.findOne({account_id}) 
    let response = null

    if (profile) {
        let result = await manage_password(password, flag, profile)

        if (flag) {
            await Profiles.updateOne({account_id}, {$set: result.data})
        }

        response = result
    } 

    res.send(response) 
})

app.post('/meeting-waypoints', async (req, res) => {
    generate_pdf(res, 'result', req.body)
})

app.listen(PORT, () => console.log(`Server started on ${PORT} port`))