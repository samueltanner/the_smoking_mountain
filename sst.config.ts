/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "TheSmokingMountain",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          region: "us-east-1",
        }
      }
    }
  },
  async run() {
    const stage = $app.stage
    const callerIdentity = await aws.getCallerIdentity({})

    console.log(callerIdentity)
    new sst.aws.Nextjs("TheSmokingMountain", {
      domain: {
        name: "thesmokingmountain.com",
        aliases: ["www.thesmokingmountain.com"],
      },
    })
  },
})
