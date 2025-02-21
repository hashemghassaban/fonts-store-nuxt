import { setCTX } from '~/services/index'
// import ProfileService from '~/services/Profile'

export default (ctx, inject) => {
  setCTX(ctx)

  // ctx.profileService = new ProfileService(ctx)
  // inject('profileService', ctx.profileService)
}
