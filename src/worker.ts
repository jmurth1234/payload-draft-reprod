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

      // update the Entity
      const updateFirst = await payload.update({
        collection: 'entity',
        id: finalEntity.id,
        draft: true,
        data: {
          myField: `Hello World ${Math.random()}`,
        },
      })

      console.log('Update MyField: ', updateFirst.myField)

      // const collection = payload.db.collections['entity']

      // const otherField = `Hello World ${Math.random()}`
      // console.log('OtherField: ', otherField)

      // update otherField
      // await collection.updateOne({ _id: finalEntity.id }, { $set: { otherField } })

      // and again to test theory
      // const res = await payload.update({
      //   collection: 'entity',
      //   id: finalEntity.id,
      //   data: {
      //     myField: `Hello World ${Math.random()}`,
      //   },
      // })

      // console.log(res)

      process.exit(0)
    },
  })
}

start()
