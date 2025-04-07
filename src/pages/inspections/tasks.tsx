import Layout from "../../shared/components/layout/layout";
import InspectionTaskNav from "./components/inspection-task-navigation";

const Tasks = () => {

  return (
    <>
      <Layout>
        {" "}
        <section className="content-body">
          <header className="page-header">
            <div className="page_title">
              <h2>Inspections</h2>
            </div>
          </header>

          <InspectionTaskNav />
        </section>
      </Layout>
    </>
  );
};

export default Tasks;
