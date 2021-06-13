import { expect } from 'chai'
import 'mocha'
import { flattenToRows } from '../src/pages/flattenToRows'

/* Data structure 
    // TODO - figure out best place to put documentation
        contentful_id:  primary key for this record
        name: name of geographical area (region or subregion)
        slug: slug is like a URL friendly name for the subregion
        region: includes { contentful_id: }
            records that are regions will have 3 attributes:      contentful_id: name: slug: 
            records that are sub regions then it has 4 attributes: contentful_id: name: slug: region
*/
const validData = {
  allContentfulDataGeoRegionSubRegion: {
    nodes: [
      {
        contentful_id: '5QleMRmhfjcCPJcl0hyapC',
        name: 'Calais/Dunkirk',
        slug: 'calais-dunkirk',
        region: { contentful_id: '3MYazP862LGoycVYX2w492' },
      },
      {
        contentful_id: '15DzXnD4u70h24CQORFsiT',
        name: 'Athens/Southern Mainland',
        slug: 'athens-southern-mainland',
        region: { contentful_id: '4nuGDkPN1NvvBYpCnu2O73' },
      },
      {
        contentful_id: 'YEHgwxNjCpd8nD3FG651I',
        name: 'Aegean Islands',
        slug: 'aegean-islands',
        region: { contentful_id: '4nuGDkPN1NvvBYpCnu2O73' },
      },
      {
        contentful_id: '4G5Sta5BhPtdqhtpDhd4oD',
        name: 'Chios',
        slug: 'chios',
        region: { contentful_id: '4nuGDkPN1NvvBYpCnu2O73' },
      },
      {
        contentful_id: '4NyAcUhuqz4dSAIEZ70L50',
        name: 'Lesvos',
        slug: 'lesvos',
        region: { contentful_id: '4nuGDkPN1NvvBYpCnu2O73' },
      },
      {
        contentful_id: '6gqZptGPZW1hyrNHy4ePLp',
        name: 'Samos',
        slug: 'samos',
        region: { contentful_id: '4nuGDkPN1NvvBYpCnu2O73' },
      },
      {
        contentful_id: '27660yZzHdH30RRgs8pa7l',
        name: 'Scotland',
        slug: 'scotland',
        region: { contentful_id: '2PtTEUcQlv4kegMYZJZpQh' },
      },
      {
        contentful_id: '1826WJymRI2Qbb92ngPCEG',
        name: 'Lebanon',
        slug: 'lebanon',
        region: { contentful_id: '4K43pr3ilQWk9CES7rUOHi' },
      },
      {
        contentful_id: 'PPbpxaTUujVwKbOuxFEEB',
        name: 'England',
        slug: 'england',
        region: { contentful_id: '2PtTEUcQlv4kegMYZJZpQh' },
      },
      {
        contentful_id: '1OwAgmfoBc6NOj4TPFVEhi',
        name: 'Bosnia',
        slug: 'bosnia',
        region: { contentful_id: '5uV7XcbY4pOuRuIPDm349x' },
      },
      {
        contentful_id: '4QWhOZJ0pRdOnikuYrKvZ3',
        name: 'Serbia',
        slug: 'serbia',
        region: { contentful_id: '5uV7XcbY4pOuRuIPDm349x' },
      },
      {
        contentful_id: '3I4MuzlfM7e0w55FlSa04n',
        name: 'Paris',
        slug: 'paris',
        region: { contentful_id: '3MYazP862LGoycVYX2w492' },
      },
      {
        contentful_id: 'ds8UGIkRvWjpkG3T5Eoub',
        name: 'Croatia',
        slug: 'croatia',
        region: { contentful_id: '5uV7XcbY4pOuRuIPDm349x' },
      },
      {
        contentful_id: '6NcA1Dn2KhXm3PcWLsp1kd',
        name: 'Thessaloniki/ Northern Mainland',
        slug: 'thessaloniki-northern-mainland',
        region: { contentful_id: '4nuGDkPN1NvvBYpCnu2O73' },
      },
      {
        contentful_id: '4fkSVPRz5dAJkaJ1iJB2dn',
        name: 'Frankfurt',
        slug: 'frankfurt',
        region: { contentful_id: '3nDwTGViIiQscsG3vuBfbf' },
      },
      {
        contentful_id: '6RLCwtDct8wHdjPs0MykRd',
        name: 'Berlin',
        slug: 'berlin',
        region: { contentful_id: '3nDwTGViIiQscsG3vuBfbf' },
      },
    ],
  },
  allContentfulDataGeoRegion: {
    nodes: [
      {
        contentful_id: '4nuGDkPN1NvvBYpCnu2O73',
        name: 'Greece',
        slug: 'greece',
      },
      {
        contentful_id: '5uV7XcbY4pOuRuIPDm349x',
        name: 'The Balkans',
        slug: 'the-balkans',
      },
      {
        contentful_id: '3MYazP862LGoycVYX2w492',
        name: 'France',
        slug: 'france',
      },
      {
        contentful_id: '2PtTEUcQlv4kegMYZJZpQh',
        name: 'British Isles',
        slug: 'british-isles',
      },
      {
        contentful_id: '4K43pr3ilQWk9CES7rUOHi',
        name: 'Middle East',
        slug: 'middle-east',
      },
      {
        contentful_id: '3nDwTGViIiQscsG3vuBfbf',
        name: 'Germany',
        slug: 'germany',
      },
    ],
  },
}

const greeceData = {
  allContentfulDataGeoRegion: {
    nodes: [
      {
        contentful_id: '4nuGDkPN1NvvBYpCnu2O73',
        name: 'Greece',
        slug: 'greece',
      },
    ],
  },
  allContentfulDataGeoRegionSubRegion: {
    nodes: [
      {
        contentful_id: '15DzXnD4u70h24CQORFsiT',
        name: 'Athens/Southern Mainland',
        slug: 'athens-southern-mainland',
        region: { contentful_id: '4nuGDkPN1NvvBYpCnu2O73' },
      },
    ],
  },
}

const regionFrance = {
  contentful_id: '3MYazP862LGoycVYX2w492',
  name: 'France',
  slug: 'france',
}
const regionGreece = {
  contentful_id: '4nuGDkPN1NvvBYpCnu2O73',
  name: 'Greece',
  slug: 'greece',
}

const subregionParis = {
  contentful_id: '3I4MuzlfM7e0w55FlSa04n',
  name: 'Paris',
  slug: 'paris',
  region: { contentful_id: '3MYazP862LGoycVYX2w492' },
}

function givenData(regions, subRegions) {
  return {
    allContentfulDataGeoRegionSubRegion: {
      nodes: [...subRegions],
    },
    allContentfulDataGeoRegion: {
      nodes: [...regions],
    },
  }
}

describe('Where We Work', function () {
  describe('flattenToRows', function () {
    it('Can Be Called', function () {
      flattenToRows(validData)
    })

    it('flattens one sub-region', function () {
      const data = givenData([regionFrance], [subregionParis])

      const expected = [
        {
          contentfulId: regionFrance.contentful_id,
          name: regionFrance.name,
          subRegions: [
            {
              contentfulId: subregionParis.contentful_id,
              name: subregionParis.name,
            },
          ],
        },
      ]
      expect(flattenToRows(data)).to.deep.equal(expected)
    })

    it('flattens multiple regions', function () {
      const greeceAndFrance = {
        allContentfulDataGeoRegionSubRegion: {
          nodes: [
            {
              contentful_id: '15DzXnD4u70h24CQORFsiT',
              name: 'Athens/Southern Mainland',
              slug: 'athens-southern-mainland',
              region: { contentful_id: '4nuGDkPN1NvvBYpCnu2O73' },
            },
            {
              contentful_id: '5QleMRmhfjcCPJcl0hyapC',
              name: 'Calais/Dunkirk',
              slug: 'calais-dunkirk',
              region: { contentful_id: '3MYazP862LGoycVYX2w492' },
            },
          ],
        },
        allContentfulDataGeoRegion: {
          nodes: [
            {
              contentful_id: '4nuGDkPN1NvvBYpCnu2O73',
              name: 'Greece',
              slug: 'greece',
            },
            {
              contentful_id: '3MYazP862LGoycVYX2w492',
              name: 'France',
              slug: 'france',
            },
          ],
        },
      }

      const expected = [
        {
          contentfulId: '4nuGDkPN1NvvBYpCnu2O73',
          name: 'Greece',
          subRegions: [
            {
              contentfulId: '15DzXnD4u70h24CQORFsiT',
              name: 'Athens/Southern Mainland',
            },
          ],
        },

        {
          contentfulId: '3MYazP862LGoycVYX2w492',
          name: 'France',
          subRegions: [
            {
              contentfulId: '5QleMRmhfjcCPJcl0hyapC',
              name: 'Calais/Dunkirk',
            },
          ],
        },
      ]

      expect(flattenToRows(greeceAndFrance)).to.deep.equal(expected)
    })

    xit('flattens multiple sub-regions', function () {
      const greeceMultiSubRegionData = {
        allContentfulDataGeoRegionSubRegion: {
          nodes: [
            {
              contentful_id: '15DzXnD4u70h24CQORFsiT',
              name: 'Athens/Southern Mainland',
              slug: 'athens-southern-mainland',
              region: { contentful_id: '4nuGDkPN1NvvBYpCnu2O73' },
            },
            {
              contentful_id: 'YEHgwxNjCpd8nD3FG651I',
              name: 'Aegean Islands',
              slug: 'aegean-islands',
              region: { contentful_id: '4nuGDkPN1NvvBYpCnu2O73' },
            },
          ],
        },
        allContentfulDataGeoRegion: {
          nodes: [
            {
              contentful_id: '4nuGDkPN1NvvBYpCnu2O73',
              name: 'Greece',
              slug: 'greece',
            },
          ],
        },
      }

      const expected = [
        {
          contentfulId: '4nuGDkPN1NvvBYpCnu2O73',
          name: 'Greece',
          subRegions: [
            {
              contentfulId: '15DzXnD4u70h24CQORFsiT',
              name: 'Athens/Southern Mainland',
            },
            {
              contentfulId: 'YEHgwxNjCpd8nD3FG651I',
              name: 'Aegean Islands',
            },
          ],
        },
      ]
      expect(flattenToRows(greeceMultiSubRegionData)).to.deep.equal(expected)
    })
  })
})
