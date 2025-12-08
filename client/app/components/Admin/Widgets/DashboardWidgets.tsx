import React, { FC } from 'react'

type Props = {
    open? : boolean,
    value? : number
}

const DashboardWidgets: FC<Props> = ({open , value}) => {
  return (
    <div>DashboardWidgets</div>
  )
}

export default DashboardWidgets