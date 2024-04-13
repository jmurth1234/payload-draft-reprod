import { CollectionConfig } from "payload/types";

const Entity: CollectionConfig = {
  slug: "entity",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "myField",
      type: "text",
      required: true,
    },
    {
      name: "otherField",
      type: "text",
    }
  ],
  versions: {
    drafts: {
      autosave: true,
    },
  },
};

export default Entity;
