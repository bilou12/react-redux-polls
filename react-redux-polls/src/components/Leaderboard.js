import { connect } from "react-redux";

const Leaderboard = ({ usersValues }) => {
  let data = usersValues.map((user) => {
    return {
      name: user.name,
      questionsCount: user.questions.length,
      answeredCount: Object.keys(user.answers).length,
      totalCount: user.questions.length + Object.keys(user.answers).length,
      avatarURL: user.avatarURL,
    };
  });

  data.sort((a, b) => b.totalCount - a.totalCount);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Answered</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => {
            return (
              <tr key={d.name}>
                <td>
                  <img
                    src={d.avatarURL}
                    alt={`Avatar of ${d.name}`}
                    className="avatar"
                  />
                </td>
                <td>{d.name}</td>
                <td>{d.answeredCount}</td>
                <td>{d.questionsCount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  return {
    usersValues: Object.values(users),
  };
};

export default connect(mapStateToProps)(Leaderboard);
