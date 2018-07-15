import Table from '@/components/code/table/Table'
import TableCard from '@/components/code/table/TableCard'


export default [
  {
    path: '/code/table',
    name: "Table",
    component: Table
  },
  {
    path: '/code/:name/table',
    name: "TableCard",
    component: TableCard,
    props: true
  }
]
