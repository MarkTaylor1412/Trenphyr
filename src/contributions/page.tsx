// import { Contribution, columns } from "./columns";
// import { DataTable } from "./DataTable";

// async function getData(): Promise<Contribution[]> {
//     return [
//         {
//             id: "1",
//             uploadedUserId: "1",
//             title: "Title 1",
//             content: "Content 1",
//             imageId: "1",
//             documentId: "1",
//             submissionPeriodId: "1",
//         },
//         {
//             id: "2",
//             uploadedUserId: "2",
//             title: "Title 2",
//             content: "Content 2",
//             imageId: "2",
//             documentId: "2",
//             submissionPeriodId: "2",
//         },
//         {
//             id: "3",
//             uploadedUserId: "3",
//             title: "Title 3",
//             content: "Content 3",
//             imageId: "3",
//             documentId: "3",
//             submissionPeriodId: "3",
//         },
//     ]
// }

// export default async function DemoPage() {
//     const data = await getData();

//     return (
//         <div className="container mx-auto py-10">
//             <DataTable columns={columns} data={data} />
//         </div>
//     )
// }
