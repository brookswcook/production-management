# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.9.1](https://github.com/brookswcook/production-management/compare/dashboard-api@1.9.0...dashboard-api@1.9.1) (2023-05-19)


### Bug Fixes

* fabric image loading; update apollo/client ([ddd9930](https://github.com/brookswcook/production-management/commit/ddd99304fa76baeead1a6f4d881a2f3dd4dcd919))





# [1.9.0](https://github.com/brookswcook/production-management/compare/dashboard-api@1.8.0...dashboard-api@1.9.0) (2023-05-07)


### Bug Fixes

* add app uri to config ([70bcc01](https://github.com/brookswcook/production-management/commit/70bcc013ffc6b2ac0adc7dacf71cebeb3cafa05f))
* enable typedi in resolvers properly ([f787b50](https://github.com/brookswcook/production-management/commit/f787b50350a5e7ac035f37b41e72cf00e51611ca))
* introduce interface for entities supporting multi tenancy ([b640edb](https://github.com/brookswcook/production-management/commit/b640edb7d98e2214f1fec6f6829bb4d485ec6ebc))
* proper handle of techpacks null array ([3c51db0](https://github.com/brookswcook/production-management/commit/3c51db0df07fada88d9ff17fb81f851b541f0092))
* reduce possible number of messaging tokens ([4535cb6](https://github.com/brookswcook/production-management/commit/4535cb67b476d5463e29e8865683d9da20ebe7f2))


### Features

* action logs support push notifications ([2c24f07](https://github.com/brookswcook/production-management/commit/2c24f07f3f1f146fef323d24b6d3d84fdc4b037f))
* add basic sendgrid integration to send emails ([348515f](https://github.com/brookswcook/production-management/commit/348515f6dafb0914a6d7505edf10fb540d0e67dd))
* add userAgent to notification subscription model ([b5a3dee](https://github.com/brookswcook/production-management/commit/b5a3deea25667bcd9f4cd5a1c93eb72079a65efe))
* be able to get notification tokens by user role ([596989e](https://github.com/brookswcook/production-management/commit/596989e925cb7e1f865a527f08032cb3f886b87c))
* get user ids service method ([1cf8842](https://github.com/brookswcook/production-management/commit/1cf88426241a1d29453630edb42bd657def381d9))
* notificationSubscription module ([17e2afc](https://github.com/brookswcook/production-management/commit/17e2afce33c19f8c5066041985636e87c559a265))
* sendgrid config setup ([cec0e7b](https://github.com/brookswcook/production-management/commit/cec0e7bf06377e09bb855900e19b9ba8940e135a))
* sendMessageToDevice firebase function ([3cfa503](https://github.com/brookswcook/production-management/commit/3cfa5034b5d9ae9785adbff9cef8405d6c701219))
* show related entity slug in notifications ([4c7a788](https://github.com/brookswcook/production-management/commit/4c7a78821caf377dff5eb2867d037ec8ae10f924))
* support slug by several models ([b3c81a9](https://github.com/brookswcook/production-management/commit/b3c81a970e6ff53de0a0ac19591a46bea6fd294a))
* use fingerprint intead of userAgent for notificationSubscription ([70ce26f](https://github.com/brookswcook/production-management/commit/70ce26f32f2e0484db58178f8326798b9921234a))
* use logs with notifications where possible ([f7ed91a](https://github.com/brookswcook/production-management/commit/f7ed91ae3e1db27c520b1cab9f04b988a683049b))
* use typedi to inject services ([d230f0a](https://github.com/brookswcook/production-management/commit/d230f0a6fb90f97f849bc04269bdd30b53a165ef))





# [1.8.0](https://github.com/brookswcook/production-management/compare/dashboard-api@1.7.0...dashboard-api@1.8.0) (2023-04-30)


### Features

* create order item bulky table form ([abfc997](https://github.com/brookswcook/production-management/commit/abfc997c5b9c218d7c63717eab0ae655d07af304))





# [1.7.0](https://github.com/brookswcook/production-management/compare/dashboard-api@1.6.0...dashboard-api@1.7.0) (2023-03-27)


### Bug Fixes

* add a note about price ([6a5816d](https://github.com/brookswcook/production-management/commit/6a5816de6873420fc067359e0e07d47e32f83d37))
* grouped order items by attributes ([f1bda3e](https://github.com/brookswcook/production-management/commit/f1bda3ec7b3e465fd0741258b681c2b2a30e273f))
* remove note creating action log ([56e5358](https://github.com/brookswcook/production-management/commit/56e535841489743e12d00357f8e83149c0a8e76d))


### Features

* bulk production cost discounts api ([6c36123](https://github.com/brookswcook/production-management/commit/6c36123dc51dab4e606445f017c8a91270fdbd72))
* get order items grouped by attribute graphql query ([6cb5410](https://github.com/brookswcook/production-management/commit/6cb5410ca8a212cc4f08fa8cfc1854bdb71391e1))
* get order items grouped by attributes query ([ec938e8](https://github.com/brookswcook/production-management/commit/ec938e83209b4b1cf5f145b269367d395e86a877))
* keep prod cost under production section of product ([efea164](https://github.com/brookswcook/production-management/commit/efea1648e204f95e43578e998904e42c3977e0db))





# [1.6.0](https://github.com/brookswcook/production-management/compare/dashboard-api@1.5.1...dashboard-api@1.6.0) (2023-03-05)


### Bug Fixes

* add a note about populate ([217c4f1](https://github.com/brookswcook/production-management/commit/217c4f1d61c622e495dbcaa090dfcb7e7174b7f8))
* implement timestamps properly ([a6fe45a](https://github.com/brookswcook/production-management/commit/a6fe45a67122ff14c4566bab2f6f2d985354092c))
* refactor fields in model ([a1fbe4d](https://github.com/brookswcook/production-management/commit/a1fbe4d9249c89800d8f085a10495083757aecf8))
* remove more redundant comments ([058676f](https://github.com/brookswcook/production-management/commit/058676f4c97f1ff5988b174713d33ec29140eaf9))
* remove redundant comments ([a1de252](https://github.com/brookswcook/production-management/commit/a1de252c5d62e9c2791afc801366e4fc9abec7b6))


### Features

* add production cost field & rearrange other ([6117099](https://github.com/brookswcook/production-management/commit/61170996bcfef41a44f4aef9f0f9f494c61e95a7))
* be able to get notes from query ([a223474](https://github.com/brookswcook/production-management/commit/a223474ff11421707364e7f2dc6f173fa16cc1ad))
* update cost mutation ([705ccb0](https://github.com/brookswcook/production-management/commit/705ccb0e8b2dd790d3a74f57d9ba9eb6c044bd78))





## [1.5.1](https://github.com/brookswcook/production-management/compare/dashboard-api@1.5.0...dashboard-api@1.5.1) (2023-02-21)


### Bug Fixes

* action logs refetching on several actions ([c1485b1](https://github.com/brookswcook/production-management/commit/c1485b13da1c12bbd41220d83beae6b85921dc41))
* remove oplog ([52fc2fc](https://github.com/brookswcook/production-management/commit/52fc2fcf2dda6ba46b828a0fa6ea0a9e24126214))





# [1.5.0](https://github.com/brookswcook/production-management/compare/dashboard-api@1.4.0...dashboard-api@1.5.0) (2023-02-16)


### Features

* add notes to po entity ([8e1fdb1](https://github.com/brookswcook/production-management/commit/8e1fdb112410e65d3b04b88dbd6c356ffaddbabb))





# [1.4.0](https://github.com/brookswcook/production-management/compare/dashboard-api@1.3.0...dashboard-api@1.4.0) (2023-02-16)


### Bug Fixes

* add a note about log title ([374d6be](https://github.com/brookswcook/production-management/commit/374d6be6283e57cd54604d8e6bfa3f625d8f63ce))
* add an index to increase performance of getting action logs ([cb1b669](https://github.com/brookswcook/production-management/commit/cb1b669dc885016eb02d44e2302cee146aceb423))
* add companyId to sample schema ([0d9732c](https://github.com/brookswcook/production-management/commit/0d9732cd8617dcd7d1d09b5de8c65f6f577effb0))
* add id to graphql schema of purchase order ([71f2974](https://github.com/brookswcook/production-management/commit/71f2974cd3ed716acea2fd9b0518412376d7393c))
* add text index to oplog variables ([3438be4](https://github.com/brookswcook/production-management/commit/3438be4af7812c33b5c8ee0d5ed15f7e8f5d60f8))
* do not expose company id of sample ([e71b004](https://github.com/brookswcook/production-management/commit/e71b00410d905ab45c910c97a8efd03f40a1a1a0))
* rearrange plugin order ([956219e](https://github.com/brookswcook/production-management/commit/956219ef5c0f891e3d55e7f8da7e42302a3b8542))
* rename typegoose middleware ([329a59d](https://github.com/brookswcook/production-management/commit/329a59d3955cc948e2c221ec50461cf2be59720f))
* **samples:** support multitenancy ([b352373](https://github.com/brookswcook/production-management/commit/b35237336c1f6bf206834fa8cc8c550d0764aec2))
* **tenantIdDecorator:** simlify an id obtaining ([613da31](https://github.com/brookswcook/production-management/commit/613da317010b4efaa6d12e45bdd7af02377f1f9a))
* update sample logs title ([ecf5aec](https://github.com/brookswcook/production-management/commit/ecf5aec8c9c644f3a1b2e85c4e276a8877097a4a))
* update tech pack creation title ([09c7722](https://github.com/brookswcook/production-management/commit/09c7722de74961e0f0714638681d6fc6d67688b6))
* update title of note creation log record ([284d438](https://github.com/brookswcook/production-management/commit/284d4380333ab58ec3b4d2cd20f9740538b3030e))


### Features

* **action-logging:** action log entity ([15c00c9](https://github.com/brookswcook/production-management/commit/15c00c97601f6e7b8367db98b571013a079eccbd))
* **action-logging:** action log middleware ([7bcdcb3](https://github.com/brookswcook/production-management/commit/7bcdcb3b3652552fd1322056876eb19d28137410))
* **action-logging:** enable logging for mutations ([c3815ae](https://github.com/brookswcook/production-management/commit/c3815aeb63fa52b2bf2db280505d3f7e95a87533))
* add action log resolver ([11adcc1](https://github.com/brookswcook/production-management/commit/11adcc1a4df061d896d85b1455eae3ee45ad5d7e))
* be able to get action logs of specific types and ids ([9276885](https://github.com/brookswcook/production-management/commit/92768851260617813188abc788edeb6730039bab))
* **company:** company should have tenant field too ([f9a4d04](https://github.com/brookswcook/production-management/commit/f9a4d0415e52cb8c6831f400814536e87e892195))
* createdAt field is not nullable ([103bfa2](https://github.com/brookswcook/production-management/commit/103bfa291ec297feb8e12f0027789a42fcd273d1))
* **user:** return user in delete mutation instead of boolean ([77601bc](https://github.com/brookswcook/production-management/commit/77601bc9dac21693a830ce943da1838a1690ab6d))





# [1.3.0](https://github.com/brookswcook/production-management/compare/dashboard-api@1.2.0...dashboard-api@1.3.0) (2023-02-11)


### Bug Fixes

* a note about firebase auth user data metadata ([6d9a452](https://github.com/brookswcook/production-management/commit/6d9a452a10668b5200d1178772d8b0431fa2b216))
* add a note about uploadFile method ([af40c7a](https://github.com/brookswcook/production-management/commit/af40c7a351447b59aaac375b912f27e6473f6b81))
* add a todo note ([bef5d3f](https://github.com/brookswcook/production-management/commit/bef5d3fb51681721d2615ba5f5779a2030b08c17))
* remove roles with user domains ([d137fd3](https://github.com/brookswcook/production-management/commit/d137fd3bf2cec5e339e1c81876d7c840eb70a91b))
* replace direct context usage with tenant decorator ([76b001d](https://github.com/brookswcook/production-management/commit/76b001db5fb25cbe950fa3fea910707a3233a417))


### Features

* be able to get child companies by root company id ([09b969a](https://github.com/brookswcook/production-management/commit/09b969a1f0216abcd9fe52ec873d328758fc03d1))
* **fabric:** support multitenancy on graphql layer ([ee2607a](https://github.com/brookswcook/production-management/commit/ee2607a56734f5c47cc64d8ce32b0141ef249a8a))
* first two company loaders ([1199e0b](https://github.com/brookswcook/production-management/commit/1199e0bebe1f15b94f947afa677b9155c66d6906))
* **graphql-log-plugin:** support multitenancy ([0dfa079](https://github.com/brookswcook/production-management/commit/0dfa0790e4b7e28d5d45e5edd7085b495243262f))
* graphqlLoaderPlugin ([87307f9](https://github.com/brookswcook/production-management/commit/87307f927c71b5e95412f0a7dd51d9d34aae4bc5))
* loader decorator and get loader function ([4409da4](https://github.com/brookswcook/production-management/commit/4409da417a85be2898ad60ce178dfc16cba0b675))
* **note:** support multitenancy on graphql layer ([4585381](https://github.com/brookswcook/production-management/commit/4585381bca0e8b1bb4d36532b755391861e8f0fc))
* **oplog:** support multitenancy on graphql layer ([38ac2f0](https://github.com/brookswcook/production-management/commit/38ac2f0427dbaae7efe0f1c2c9e803b4488fab4b))
* **product:** support multitenancy on graphql layer ([07b7bef](https://github.com/brookswcook/production-management/commit/07b7bef624697f05bdb3d28a00f7d55f02ee218b))
* remove entities filter by role name ([665f0b3](https://github.com/brookswcook/production-management/commit/665f0b31ffae0d734b801de1efc113ebe4176b88))
* replace factory code with factory id in relations ([b2b86ec](https://github.com/brookswcook/production-management/commit/b2b86ec3d2afa62ef09f3f691f5b80b238710fdd))
* replace factoryCode with factoryId in user ([073a01f](https://github.com/brookswcook/production-management/commit/073a01f2ec6bb720e9bd71502f93d43a868709e4))
* replace hardcoded factory code with factory id in fabric ([297d7b3](https://github.com/brookswcook/production-management/commit/297d7b349a9a3f6adabdde3511c7ce96a6f8b9e4))
* replace hardcoded factory codes with real ones ([1623db7](https://github.com/brookswcook/production-management/commit/1623db7d6ce05c339dc834718b08e5d71b874793))
* **style:** support multitenancy in graphql layer ([43c6b24](https://github.com/brookswcook/production-management/commit/43c6b242d47d152c95e9d2b30cc9be314a98839c))
* support loaders through context ([72d9708](https://github.com/brookswcook/production-management/commit/72d97084b6e9bf6c4d31931ca5b3f69e29cdf36f))
* tenantId param decorator ([7de227b](https://github.com/brookswcook/production-management/commit/7de227b50527690a2954fc18db65a0a28b49169a))
* use generic findOneOrFail method ([7770b74](https://github.com/brookswcook/production-management/commit/7770b74d60ad92a53b8f31624459943a02b81a8f))
* **user:** support multitenancy in queries ([a030e63](https://github.com/brookswcook/production-management/commit/a030e63395aa8c2e599ea97cfb380eea1ac93c44))





# 1.2.0 (2023-02-03)


### Bug Fixes

* add company input class ([7ad7768](https://github.com/brookswcook/production-management/commit/7ad776870d70262a843c4ca9c74db1402fd2b450))
* add phones to company and factory ([e3f3ad9](https://github.com/brookswcook/production-management/commit/e3f3ad9d94d1ed992f05e825e0c08780267beec5))
* add typegoose middleware to use root decorator properly ([735406c](https://github.com/brookswcook/production-management/commit/735406c29d31b57cbf232706a0a3b83880aed2b1))
* attribute definition update fields ([7b77aff](https://github.com/brookswcook/production-management/commit/7b77affc6c56ce0378fa0bd25809922e39fa310f))
* get companyId from context for order item ([52beb2c](https://github.com/brookswcook/production-management/commit/52beb2c9448b52db678a9b21ad245204c1bfea90))
* keep address as part of company instead of point of contact or user ([3df2c0f](https://github.com/brookswcook/production-management/commit/3df2c0f82c3c91225b1803279b966e22ef428c69))
* mark contacts not nullable ([10e2b69](https://github.com/brookswcook/production-management/commit/10e2b6978d74d1a2bbf0b8dc4b6a63bd4be17a23))
* move logger away of core to not add it to frontend wip [#12](https://github.com/brookswcook/production-management/issues/12) ([89bad45](https://github.com/brookswcook/production-management/commit/89bad4504d6d269f8c8c38da02cc9c2e7b9b65ec))
* order item grid ui and populate issue ([a7958d9](https://github.com/brookswcook/production-management/commit/a7958d9c697bcbdce9e8de8ab47066afa0db8937))
* populate contacts properly ([5cb2e70](https://github.com/brookswcook/production-management/commit/5cb2e70c66ba42181214c4bf1ed805102bc98495))
* product calculated props ([f131650](https://github.com/brookswcook/production-management/commit/f131650f06d490548da57c26818e8b579335fb33))
* remove comment ([37095d3](https://github.com/brookswcook/production-management/commit/37095d300c2e2f41bb2bc32aaacd9acf04a556da))
* remove node dependenct from core; update CRA; closes [#12](https://github.com/brookswcook/production-management/issues/12) ([50a202c](https://github.com/brookswcook/production-management/commit/50a202ce3fa60df732e0df96b33346af330e5523))
* uid field of purchase order ([4cb5887](https://github.com/brookswcook/production-management/commit/4cb588753d20d728f665df1439ea2de9b014504c))
* update package locks ([3439402](https://github.com/brookswcook/production-management/commit/3439402ba6c1b3b11dd17c244e7205091bf6c85e))


### Features

* add address to the user ([f5f9a26](https://github.com/brookswcook/production-management/commit/f5f9a2610d202c0d91ce4e3b14574bd6a6b5023f))
* add company entity ([da030dc](https://github.com/brookswcook/production-management/commit/da030dcf6afc7dc8df1e1182cae9a4241cf5711b))
* add companyCode field to the user ([8024de6](https://github.com/brookswcook/production-management/commit/8024de655a7d9759983940102ba89967849f866d))
* add companyCode to orderItem ([e6c576b](https://github.com/brookswcook/production-management/commit/e6c576bea378cbc11d18d2eaf3581604b81179be))
* add companyId to user payload ([756339a](https://github.com/brookswcook/production-management/commit/756339afc6ad0ec27dbe45316266df332bd41545))
* add contact details for a company through associated user ([8eeb400](https://github.com/brookswcook/production-management/commit/8eeb4000e75cbd5ef3b1c6b3a0ce849f69b6887a))
* add contact details to the user ([212363c](https://github.com/brookswcook/production-management/commit/212363c915d60278d9a334b02b4a01e8fe4b2e39))
* add states to PO ([e534048](https://github.com/brookswcook/production-management/commit/e5340485b0d8e8ae0d263bdceb1848f821f578fb))
* allow only one user with contact details for now per company ([6dfdef0](https://github.com/brookswcook/production-management/commit/6dfdef00518e2108624c3afcf06a72335abbe229))
* attribute input ([9a40742](https://github.com/brookswcook/production-management/commit/9a407421e94aaa4e5717b0990f7299e3be68ee1e))
* attributes in order item ([62351fe](https://github.com/brookswcook/production-management/commit/62351fe05f9739ec35d58c6b29e14e2d1e9294c1))
* company and factory fields of PO ([b269bea](https://github.com/brookswcook/production-management/commit/b269beab1ceb2f7e75238adcdb4824fe24f6c061))
* create company input ([ca1d397](https://github.com/brookswcook/production-management/commit/ca1d397795edcb780318e5718691d4f3cbfbc191))
* createPurchaseOrder mutation ([c33c817](https://github.com/brookswcook/production-management/commit/c33c817b3de257acdd25227964f9e6f9a871b8e2))
* findOneOrFail populate option ([8676da1](https://github.com/brookswcook/production-management/commit/8676da13c3aff6e8bfd5bed6b5b6571246704ba1))
* order item attribute to support variants ([77491c1](https://github.com/brookswcook/production-management/commit/77491c14c4ff3dbe38b41b7574cc6b6f4ff4aaf9))
* order item creation + attributes ([485dec0](https://github.com/brookswcook/production-management/commit/485dec04a623fde0855b1b8157bbd2f9d9ff52a4))
* order item list ([310e929](https://github.com/brookswcook/production-management/commit/310e92986199d6124d33406959313002c710b909))
* order item query ([d373159](https://github.com/brookswcook/production-management/commit/d373159f473959ec6ab3c2106eaae1bf4f2014bf))
* orderItem entity ([8abf349](https://github.com/brookswcook/production-management/commit/8abf349e668a1312044c19bc2a1fc739da31d6cb))
* PO creation form main fields ([15f84ca](https://github.com/brookswcook/production-management/commit/15f84ca7ae90d76c4bedda0a50b08b71704e4415))
* product attribute model ([fb202cd](https://github.com/brookswcook/production-management/commit/fb202cda2a1814a264e06cd330caa87c3514534b))
* product attribute resolver ([401c677](https://github.com/brookswcook/production-management/commit/401c6778ba3e72ea6bd8561539c2a7376d3a8c23))
* purchase order resolver ([c016822](https://github.com/brookswcook/production-management/commit/c016822b28b13b975955c5f999bad28129f7c779))
* purchase order status and creation action ([8c6baa4](https://github.com/brookswcook/production-management/commit/8c6baa4698f86b897fae836c308c1c17784b53f7))
* purchaseOrder model wip ([2eae282](https://github.com/brookswcook/production-management/commit/2eae28237db84295d783a388d54e96a46c759f36))
* purchaseOrder resolver ([fab2ef2](https://github.com/brookswcook/production-management/commit/fab2ef254f5e1f0dc39d1893619884dbe242a551))
* show dynamic attributes of order in PO ([ff1d0eb](https://github.com/brookswcook/production-management/commit/ff1d0eb9d0a992f2305f4b19e38f1ae13757be4b))
* use factory type of companies instead of factory entity ([c6e3ec5](https://github.com/brookswcook/production-management/commit/c6e3ec55f47a8691f0c75cefb4c3a491c87c9f5b))



# 1.1.0 (2023-02-03)


### Bug Fixes

* add cors headers before anyhting else ([8af6c5b](https://github.com/brookswcook/production-management/commit/8af6c5b3014e1ca8d575f69b8a96fd0eae2526f6))
* add return value ([b5bbe7e](https://github.com/brookswcook/production-management/commit/b5bbe7e4f2ee5f8b19df81816bf8d4faffbe11f8))
* add ts-mixer package ([d96803e](https://github.com/brookswcook/production-management/commit/d96803ef22dffd7191b2f3fe5034c55750e0da94))
* app name ([934bf21](https://github.com/brookswcook/production-management/commit/934bf217221ad418121c7b9d2f235d9c1cd6135b))
* build ([e164935](https://github.com/brookswcook/production-management/commit/e1649356a018be3f2fa3812dfca854c9fb208edc))
* create new user ([4396e36](https://github.com/brookswcook/production-management/commit/4396e36bc8ad6a94bfabe658fc90f271b4f89563))
* **getFabric:** stage field ([cbb1c19](https://github.com/brookswcook/production-management/commit/cbb1c19ab34177b5cee7fcd12fc9a950fbe35bf5))
* handle deleted and disabled users properly ([4541e09](https://github.com/brookswcook/production-management/commit/4541e092a0cb4a365018547081c6baa500795da7))
* improve style model & resolver ([e5bb105](https://github.com/brookswcook/production-management/commit/e5bb1054fe2347718dfc9854ea3b99c2b6f95976))
* keep private key in base64 to allow digitalocean use it ([b35c60a](https://github.com/brookswcook/production-management/commit/b35c60a0afbecb7497608e8e0b3261532b7acf28))
* **product.model:** rename findByCodeOrFail method ([a196a1f](https://github.com/brookswcook/production-management/commit/a196a1f40a7d7a9bd8e5d3957e89876c51650c92))
* refactor auth provider and signin mutation to use token only since it's enough ([e81d5b3](https://github.com/brookswcook/production-management/commit/e81d5b324a24b7a0aa5be752515a6fe3c6d2c07b))
* refactor s3 client ([c68e05a](https://github.com/brookswcook/production-management/commit/c68e05a9793fdef7001ab9e7649137d485775741))
* **refactor:** reuse several useful model methods ([4810062](https://github.com/brookswcook/production-management/commit/481006269e2ec25c851729fcec2e22998ae55ba2))
* remove console.log ([0f67b46](https://github.com/brookswcook/production-management/commit/0f67b4677c725086d99e5298576bfaf5626b00c4))
* s3 service upload function parameter ([be70cc9](https://github.com/brookswcook/production-management/commit/be70cc9aa21180c1b20ecee933e215828ab9404f))
* show code and name of input in product form dropdowns ([7fcd889](https://github.com/brookswcook/production-management/commit/7fcd8898fbc60998167b049211a8a2d1160067e8))


### Features

* add factory entity ([66fdfa6](https://github.com/brookswcook/production-management/commit/66fdfa623548ce8edaf7636d5f8916e36933bd74))
* add factory name to fabric ([9b423bc](https://github.com/brookswcook/production-management/commit/9b423bcbed082b794716f6b2c4db2f706743bdb0))
* add firebase and its config ([5de0d9a](https://github.com/brookswcook/production-management/commit/5de0d9a0cf817022300b11b3a5fa762d527ed7c1))
* add firebase client ([9997f85](https://github.com/brookswcook/production-management/commit/9997f851f6a17ad7d3e79928d17b2dd31a60bd67))
* add notes to fabric detail view ([38e9892](https://github.com/brookswcook/production-management/commit/38e9892f498c8247605255423d113838a8807608))
* add title and factory name to the fabric creating form ([ebafde1](https://github.com/brookswcook/production-management/commit/ebafde169f750920b070b8d26adcbce147298eb2))
* be able to create user through ui ([6cd67bc](https://github.com/brookswcook/production-management/commit/6cd67bc585824b045022248fafcfb9092eeb2390))
* be able to download techpack in versioned view ([ab8c146](https://github.com/brookswcook/production-management/commit/ab8c146f1f488f38d086cdb4622ee0f8238354ce))
* conditional rendering for color section based on color type ([2f163a6](https://github.com/brookswcook/production-management/commit/2f163a6a28ea67a934ea78fda73021217f98f8f6))
* create user graphql input ([b9140f2](https://github.com/brookswcook/production-management/commit/b9140f2d9b7860e51fc0b365f689359604c16d65))
* createdAt resolver for file ([1990f18](https://github.com/brookswcook/production-management/commit/1990f18c8ef4fa4230bcc3c1829ef4e2442e8f7a))
* extend fabric note with user data ([849bc16](https://github.com/brookswcook/production-management/commit/849bc16fa4a4169d081bab6a2c3e377b098074e9))
* fabric code filtering ([574400f](https://github.com/brookswcook/production-management/commit/574400f65dcbe965693382a4a65dcb3d6999044e))
* **fabric-graphql:** make get fabric by code not nullable ([1ea193e](https://github.com/brookswcook/production-management/commit/1ea193e0f23f098385a33c140a72a3e678f92095))
* **fabric-view:** add product codes ([1f6c272](https://github.com/brookswcook/production-management/commit/1f6c272aa971d1f8f76ac44934d5a68e18a2b4cc))
* factory listView & create action ([c252f48](https://github.com/brookswcook/production-management/commit/c252f481a5456233ae4a576cdc3b8cb33bb15d3d))
* factory role of the user should contain factory code ([4e6a91d](https://github.com/brookswcook/production-management/commit/4e6a91d06ff7bc49b22bc1534d8bf8b4501d8b73))
* factory tenant aware entities ([55f0288](https://github.com/brookswcook/production-management/commit/55f028894d689cfb23227946b87f390ef4baabfb))
* file model ([97b2e67](https://github.com/brookswcook/production-management/commit/97b2e67c8a386d063a3abc19419d24d78d76864e))
* filter fabrics per factory code ([2f8132a](https://github.com/brookswcook/production-management/commit/2f8132ad6a853c51a7ca5181a30b818bdd0d2207))
* firebase user model data connection ([74e1963](https://github.com/brookswcook/production-management/commit/74e1963faeabe5e7fb6a23c22bd2d098c7f09438))
* **firebase:** create user api ([f4dd14b](https://github.com/brookswcook/production-management/commit/f4dd14b4a6bbeb54f34f13b771f35dbd06b0cfd2))
* login mutation with firebase ([263bccc](https://github.com/brookswcook/production-management/commit/263bcccb43fd4111c32aa1f3687aabe791111bab))
* make colorType nad colorCode of fabric non optional ([0d01dad](https://github.com/brookswcook/production-management/commit/0d01dad955eff34223898d1de31bd60c3755201c))
* mark samples as delivered action ([08e03ef](https://github.com/brookswcook/production-management/commit/08e03ef98ee0b4454363040910ef0519ed52c691))
* move fileType to core module ([77142e9](https://github.com/brookswcook/production-management/commit/77142e94232602d6857ec92e3588e6d09cf794c2))
* populate techpacks with user data ([0d3daac](https://github.com/brookswcook/production-management/commit/0d3daac326262773833341e2a2cea823532c258b))
* require jwt env variables, remove default mongo one ([24be5cc](https://github.com/brookswcook/production-management/commit/24be5cce37e78dc884efee15b05ff43ae5994750))
* use file entity ([4f3370b](https://github.com/brookswcook/production-management/commit/4f3370bf1141671052ab84bf53ac509cdbfb185f))
* user crud both for api and firebase ([701705a](https://github.com/brookswcook/production-management/commit/701705a362134410dcb961bdd377f22ff14f6430))
* wip fabric samples & notes ([3adfbdd](https://github.com/brookswcook/production-management/commit/3adfbdd42bcf7e0f556ed86a8091c20300c36920))





# 1.1.0 (2023-02-03)


### Bug Fixes

* add cors headers before anyhting else ([8af6c5b](https://github.com/brookswcook/production-management/commit/8af6c5b3014e1ca8d575f69b8a96fd0eae2526f6))
* add return value ([b5bbe7e](https://github.com/brookswcook/production-management/commit/b5bbe7e4f2ee5f8b19df81816bf8d4faffbe11f8))
* add ts-mixer package ([d96803e](https://github.com/brookswcook/production-management/commit/d96803ef22dffd7191b2f3fe5034c55750e0da94))
* app name ([934bf21](https://github.com/brookswcook/production-management/commit/934bf217221ad418121c7b9d2f235d9c1cd6135b))
* build ([e164935](https://github.com/brookswcook/production-management/commit/e1649356a018be3f2fa3812dfca854c9fb208edc))
* create new user ([4396e36](https://github.com/brookswcook/production-management/commit/4396e36bc8ad6a94bfabe658fc90f271b4f89563))
* **getFabric:** stage field ([cbb1c19](https://github.com/brookswcook/production-management/commit/cbb1c19ab34177b5cee7fcd12fc9a950fbe35bf5))
* handle deleted and disabled users properly ([4541e09](https://github.com/brookswcook/production-management/commit/4541e092a0cb4a365018547081c6baa500795da7))
* improve style model & resolver ([e5bb105](https://github.com/brookswcook/production-management/commit/e5bb1054fe2347718dfc9854ea3b99c2b6f95976))
* keep private key in base64 to allow digitalocean use it ([b35c60a](https://github.com/brookswcook/production-management/commit/b35c60a0afbecb7497608e8e0b3261532b7acf28))
* **product.model:** rename findByCodeOrFail method ([a196a1f](https://github.com/brookswcook/production-management/commit/a196a1f40a7d7a9bd8e5d3957e89876c51650c92))
* refactor auth provider and signin mutation to use token only since it's enough ([e81d5b3](https://github.com/brookswcook/production-management/commit/e81d5b324a24b7a0aa5be752515a6fe3c6d2c07b))
* refactor s3 client ([c68e05a](https://github.com/brookswcook/production-management/commit/c68e05a9793fdef7001ab9e7649137d485775741))
* **refactor:** reuse several useful model methods ([4810062](https://github.com/brookswcook/production-management/commit/481006269e2ec25c851729fcec2e22998ae55ba2))
* remove console.log ([0f67b46](https://github.com/brookswcook/production-management/commit/0f67b4677c725086d99e5298576bfaf5626b00c4))
* s3 service upload function parameter ([be70cc9](https://github.com/brookswcook/production-management/commit/be70cc9aa21180c1b20ecee933e215828ab9404f))
* show code and name of input in product form dropdowns ([7fcd889](https://github.com/brookswcook/production-management/commit/7fcd8898fbc60998167b049211a8a2d1160067e8))


### Features

* add factory entity ([66fdfa6](https://github.com/brookswcook/production-management/commit/66fdfa623548ce8edaf7636d5f8916e36933bd74))
* add factory name to fabric ([9b423bc](https://github.com/brookswcook/production-management/commit/9b423bcbed082b794716f6b2c4db2f706743bdb0))
* add firebase and its config ([5de0d9a](https://github.com/brookswcook/production-management/commit/5de0d9a0cf817022300b11b3a5fa762d527ed7c1))
* add firebase client ([9997f85](https://github.com/brookswcook/production-management/commit/9997f851f6a17ad7d3e79928d17b2dd31a60bd67))
* add notes to fabric detail view ([38e9892](https://github.com/brookswcook/production-management/commit/38e9892f498c8247605255423d113838a8807608))
* add title and factory name to the fabric creating form ([ebafde1](https://github.com/brookswcook/production-management/commit/ebafde169f750920b070b8d26adcbce147298eb2))
* be able to create user through ui ([6cd67bc](https://github.com/brookswcook/production-management/commit/6cd67bc585824b045022248fafcfb9092eeb2390))
* be able to download techpack in versioned view ([ab8c146](https://github.com/brookswcook/production-management/commit/ab8c146f1f488f38d086cdb4622ee0f8238354ce))
* conditional rendering for color section based on color type ([2f163a6](https://github.com/brookswcook/production-management/commit/2f163a6a28ea67a934ea78fda73021217f98f8f6))
* create user graphql input ([b9140f2](https://github.com/brookswcook/production-management/commit/b9140f2d9b7860e51fc0b365f689359604c16d65))
* createdAt resolver for file ([1990f18](https://github.com/brookswcook/production-management/commit/1990f18c8ef4fa4230bcc3c1829ef4e2442e8f7a))
* extend fabric note with user data ([849bc16](https://github.com/brookswcook/production-management/commit/849bc16fa4a4169d081bab6a2c3e377b098074e9))
* fabric code filtering ([574400f](https://github.com/brookswcook/production-management/commit/574400f65dcbe965693382a4a65dcb3d6999044e))
* **fabric-graphql:** make get fabric by code not nullable ([1ea193e](https://github.com/brookswcook/production-management/commit/1ea193e0f23f098385a33c140a72a3e678f92095))
* **fabric-view:** add product codes ([1f6c272](https://github.com/brookswcook/production-management/commit/1f6c272aa971d1f8f76ac44934d5a68e18a2b4cc))
* factory listView & create action ([c252f48](https://github.com/brookswcook/production-management/commit/c252f481a5456233ae4a576cdc3b8cb33bb15d3d))
* factory role of the user should contain factory code ([4e6a91d](https://github.com/brookswcook/production-management/commit/4e6a91d06ff7bc49b22bc1534d8bf8b4501d8b73))
* factory tenant aware entities ([55f0288](https://github.com/brookswcook/production-management/commit/55f028894d689cfb23227946b87f390ef4baabfb))
* file model ([97b2e67](https://github.com/brookswcook/production-management/commit/97b2e67c8a386d063a3abc19419d24d78d76864e))
* filter fabrics per factory code ([2f8132a](https://github.com/brookswcook/production-management/commit/2f8132ad6a853c51a7ca5181a30b818bdd0d2207))
* firebase user model data connection ([74e1963](https://github.com/brookswcook/production-management/commit/74e1963faeabe5e7fb6a23c22bd2d098c7f09438))
* **firebase:** create user api ([f4dd14b](https://github.com/brookswcook/production-management/commit/f4dd14b4a6bbeb54f34f13b771f35dbd06b0cfd2))
* login mutation with firebase ([263bccc](https://github.com/brookswcook/production-management/commit/263bcccb43fd4111c32aa1f3687aabe791111bab))
* make colorType nad colorCode of fabric non optional ([0d01dad](https://github.com/brookswcook/production-management/commit/0d01dad955eff34223898d1de31bd60c3755201c))
* mark samples as delivered action ([08e03ef](https://github.com/brookswcook/production-management/commit/08e03ef98ee0b4454363040910ef0519ed52c691))
* move fileType to core module ([77142e9](https://github.com/brookswcook/production-management/commit/77142e94232602d6857ec92e3588e6d09cf794c2))
* populate techpacks with user data ([0d3daac](https://github.com/brookswcook/production-management/commit/0d3daac326262773833341e2a2cea823532c258b))
* require jwt env variables, remove default mongo one ([24be5cc](https://github.com/brookswcook/production-management/commit/24be5cce37e78dc884efee15b05ff43ae5994750))
* use file entity ([4f3370b](https://github.com/brookswcook/production-management/commit/4f3370bf1141671052ab84bf53ac509cdbfb185f))
* user crud both for api and firebase ([701705a](https://github.com/brookswcook/production-management/commit/701705a362134410dcb961bdd377f22ff14f6430))
* wip fabric samples & notes ([3adfbdd](https://github.com/brookswcook/production-management/commit/3adfbdd42bcf7e0f556ed86a8091c20300c36920))
