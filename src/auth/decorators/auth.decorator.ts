import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../guards/jst-auth.guard'

export const Auth = () => UseGuards(JwtAuthGuard)
