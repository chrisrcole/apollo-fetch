import React from "react";

export const LinkList = (props) => {
  const { apollos } = props;
  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>Link</th>
            <th>Shortened</th>
            <th>Created</th>
          </tr>
          {apollos.map((apollo) => (
            <tr key={apollo.id}>
              <td>{apollo.inputUrl}</td>
              <td>{apollo.shortUrl}</td>
              <td>{apollo.createDate.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};