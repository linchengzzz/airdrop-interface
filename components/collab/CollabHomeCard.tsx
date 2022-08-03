import { motion } from 'framer-motion';
import { CollabList } from './CollabList';

type CollabHomeCardProps = {
  title: string;
};
export function CollabHomeCard({ title }: CollabHomeCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ ease: 'linear' }} className="w-full">
      <div className="backdrop-box rounded-2xl px-6 py-4 xs:px-3">
        <h2 className="flex items-center justify-between pb-1.5 font-medium">
          <p className="text-[22px]">{title}</p>
        </h2>
        <CollabList />
      </div>
    </motion.div>
  );
}
