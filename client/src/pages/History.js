import { useMemo, useState } from "react";
import { Appear, Table, Paragraph, Button } from "arwes";

const History = (props) => {
  const [page, setPage] = useState(0);
  const launchesPerPage = 20;

  const tableBody = useMemo(() => {
    return props.launches
      ?.filter((launch) => !launch.upcoming)
      .slice(page * launchesPerPage, (page + 1) * launchesPerPage)
      .map((launch) => {
        return (
          <tr key={String(launch.flightNumber)}>
            <td>
              <span style={{ color: launch.success ? "greenyellow" : "red" }}>
                █
              </span>
            </td>
            <td>{launch.flightNumber}</td>
            <td>{new Date(launch.launchDate).toDateString()}</td>
            <td>{launch.mission}</td>
            <td>{launch.rocket}</td>
            <td>{launch.customers?.join(", ")}</td>
          </tr>
        );
      });
  }, [props.launches, page]);

  return (
    <article id="history">
      <Appear animate show={props.entered}>
        <Paragraph>
          History of mission launches including SpaceX launches starting from
          the year 2006.
        </Paragraph>
        <Table animate>
          <table style={{ tableLayout: "fixed" }}>
            <thead>
              <tr>
                <th style={{ width: "2rem" }}></th>
                <th style={{ width: "3rem" }}>No.</th>
                <th style={{ width: "9rem" }}>Date</th>
                <th>Mission</th>
                <th style={{ width: "7rem" }}>Rocket</th>
                <th>Customers</th>
              </tr>
            </thead>
            <tbody>{tableBody}</tbody>
          </table>
        </Table>
        <div>
          <Button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={props.launches.length <= (page + 1) * launchesPerPage}
          >
            Next
          </Button>
        </div>
      </Appear>
    </article>
  );
};

export default History;
