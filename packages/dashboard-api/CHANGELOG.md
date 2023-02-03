# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
