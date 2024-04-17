import payload from 'payload'

require('dotenv').config()

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    local: true,
    onInit: async () => {
      // get the first Entity
      const entity = await payload.find({
        collection: 'entity',
        limit: 1,
        draft: true,
      })

      let finalEntity = entity.docs[0]

      if (entity.docs.length === 0) {
        // create a new Entity
        finalEntity = await payload.create({
          collection: 'entity',
          draft: true,
          data: {
            myField: `Hello World ${Math.random()}`,
          },
        })
      }

      console.log('Initial MyField: ', finalEntity.myField)

      // update the Entity multiple times (race condition)
      const updates = [
        payload.update({
          collection: 'entity',
          id: finalEntity.id,
          draft: true,
          data: {
            myField: `Hello World ${Math.random()}`,
          },
        }),
        payload.update({
          collection: 'entity',
          id: finalEntity.id,
          draft: true,
          data: {
            myField: `Hello World ${Math.random()}`,
          },
        })
      ]

      console.log('Update MyField: ', await Promise.all(updates))

      process.exit(0)
    },
  })
}

start()
