import Image from 'next/future/image';
import { Repo } from 'types/types';

const RepoCard = ({ repo, key }: { repo: Repo; key: number }) => {
  return (
    <div
      key={key}
      className="flex items-center justify-between border-b border-gray-800 py-4"
    >
      <div>
        <h1 className="font-bold">{repo.fullName}</h1>
        <p className="text-sm">{repo.description}</p>
        <div className="mt-2 flex gap-2">
          {repo.topics?.map((topic, i) => (
            <span
              key={i}
              className="full rounded-full bg-primary-900  py-0.5 px-2 text-center text-xs text-primary-200"
            >
              {topic.name}
            </span>
          ))}
        </div>
      </div>
      <a
        href={repo.owner.url}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 rounded bg-gray-800 py-2 px-4"
      >
        <div>
          <Image
            src={repo.owner.avatarUrl}
            width={25}
            height={25}
            className="rounded-full"
            alt="Profile pic"
          />
        </div>
        <span className="text-xs hover:underline">@{repo.owner.login}</span>
      </a>
    </div>
  );
};

export default RepoCard;
