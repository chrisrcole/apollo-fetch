import React from "react";

export const LinkList = (props) => {
  const { apollos } = props;

  const userApollos = apollos.filter((apollo) => apollo.user !== null);
  const publicApollos = apollos.filter((apollo) => apollo.user === null);
  return (
    <>
      {userApollos.length > 0 && (
        <table>
          <tbody>
            <tr>
              <th>Link</th>
              <th>Shortened</th>
              <th>Created</th>
            </tr>
            {userApollos.map((apollo) => (
              <tr key={apollo.id}>
                <td>{apollo.inputUrl}</td>
                <td>
                  <a
                    href={apollo.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {apollo.shortUrl}
                  </a>
                </td>
                <td>{apollo.createDate.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <br></br>
      {publicApollos.length > 0 && (
        <table>
          <tbody>
            <tr>
              <th>Link</th>
              <th>Shortened</th>
              <th>Created</th>
            </tr>
            {publicApollos.map((apollo) => (
              <tr key={apollo.id}>
                <td>{apollo.inputUrl}</td>
                <td>
                  <a
                    href={apollo.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {apollo.shortUrl}
                  </a>
                </td>
                <td>{apollo.createDate.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
