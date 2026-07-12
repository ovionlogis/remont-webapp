import { memo } from 'react';
import type { Graph, Thing, WithContext } from 'schema-dts';

interface JsonLdProps {
  json: WithContext<Thing> | Graph;
}

const LdJson: React.FC<JsonLdProps> = ({ json }) => (
  <script
    type="application/ld+json"
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(json).replace(/</g, '\\u003c')
    }}
  />
);

export default memo(LdJson);
