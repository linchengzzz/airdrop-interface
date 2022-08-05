import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Back from '../../components/back';
import { mockCollabInfoList } from '../../temp/mock';
import { CollabInfoType } from '../../lib/types';
import CollabInfo from '../../components/collab/CollabInfo';
import { CollabTimeLime } from '../../components/collab/CollabTimeLime';
import dayjs from 'dayjs';

export default function Collab({ data }: { data: CollabInfoType }) {
  const router = useRouter();
  const { timeWarmup, timeJoin, timeAllocation, timeClaim, timeClose } = data;

  const times = useMemo(() => {
    let times: any = { timeWarmup, timeJoin, timeAllocation, timeClaim, timeClose };
    for (let key in times) {
      times[key] = dayjs(times[key]).format('MM.DD');
    }
    return times;
  }, [timeWarmup, timeJoin, timeAllocation, timeClaim, timeClose]);

  return (
    <div className="mt-8">
      <Back onClick={() => router.back()} />
      <div className="my-4" onClick={(event) => event.stopPropagation()}>
        <motion.div layoutId="collab" className="backdrop-box flex flex-col gap-8 rounded-2xl p-8 xs:p-3">
          <CollabInfo data={data} />
          <CollabTimeLime {...times} />
        </motion.div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const paths: { params: { id: string } }[] = [];
  // TODO: need to replace with BE API
  if (process.env.NODE_ENV === 'production') {
    paths.push({ params: { id: 'item1' } });
  } else {
    // const { data } = await fetchCollabList();
    // paths.push(...data.map((collab) => ({ params: { id: collab.id } })));
    paths.push({ params: { id: 'item1' } });
  }
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  let data: CollabInfoType | undefined;
  const id = params.id;
  // TODO: need to replace with BE API
  const collabList = mockCollabInfoList;
  if (process.env.NODE_ENV === 'production') {
    data = collabList.find((item) => item.id === id);
  } else {
    // const res = await fetchCollabItem(id);
    // data = res.data;
    data = collabList.find((item) => item.id === id);
  }
  return { props: { data } };
}
