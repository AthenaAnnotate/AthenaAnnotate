/* global describe it */
import { expect } from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';
import path from 'path';
import NodeFilter from '../../componentMocks/NodeFilter';
import parseDoc from '../../../src/libs/zeus/src/engine/./retrievers';
import { locateAnnote, getEndNode } from '../../../src/libs/zeus/src/engine/./processors';
import { createRange  } from '../../../src/libs/zeus/src/engine/./utils';
import { annote01, annote02, annote03, annote04, annote05, annote06 } from './specAnnotes';
// import { HTMLElement } from '../../componentMocks/HTMLElement';
// import { retrieveAnnote } from '../../../src/libs/zeus/src/engine/';

let filePath;
let htmlDoc;
let targetNode;

describe('Annotation Engine Methods', () => {
    // TODO: before each clear variable values
  it('parseDoc should be a function', () => {
    expect(parseDoc).to.be.a('function');
  });

  describe('Test Basic DOM Structure', () => {
    filePath = path.join(__dirname, '/../../../src/server/views/spec/basic.html');
    htmlDoc = fs.readFileSync(filePath, 'utf8');
    global.document = jsdom.jsdom(htmlDoc);
    global.NodeFilter = NodeFilter;
    const parsedDoc = parseDoc(document.body);
    const { docText, nodes } = parsedDoc;

    it('docText should be a string', () => { // TODO: test beforeEach
      expect(docText).to.be.a('string');
    });

    it('nodes should be an array', () => { // TODO: test beforeEach
      expect(nodes).to.be.a('array');
    });

    describe('Test annote01: basic annotation', () => {
      const annoteLocation = locateAnnote(annote01, docText, nodes);
      const { startNode, endNode } = annoteLocation;

      it('should return an object', () => {
        expect(annoteLocation).to.be.a('object');
      });

      it('annote starting index should equal 775', () => {
        expect(startNode.start + startNode.startOffset).to.equal(775);
      });

      it('startNode.textNode should equal the given textNode', () => {
        targetNode = document.body.querySelector('.p2').childNodes[0];
        expect(startNode.textNode).to.equal(targetNode);
      });

      it('endNode.offset should equal 59', () => {
        expect(endNode.endOffset).to.equal(232);
      });

      it('endNode.textNode should equal the given textNode', () => {
        targetNode = document.body.querySelector('.p2').childNodes[0];
        expect(endNode.textNode).to.equal(targetNode);
      });
    });

    describe('Test annote02: partial-span --> textNode', () => {
      const annoteLocation = locateAnnote(annote02, docText, nodes);
      const { startNode, endNode } = annoteLocation;

      it('should return an object', () => {
        expect(annoteLocation).to.be.a('object');
      });

      it('annote starting index should equal 1157', () => {
        expect(startNode.start + startNode.startOffset).to.equal(1157);
      });

      it('startNode.textNode should equal the given textNode', () => {
        targetNode = document.body.querySelector('.p2').childNodes[1].childNodes[0];
        expect(startNode.textNode).to.equal(targetNode);
      });

      it('endNode.offset should equal 38', () => {
        expect(endNode.endOffset).to.equal(38);
      });

      it('endNode.textNode should equal the given textNode', () => {
        targetNode = document.body.querySelector('.p2').childNodes[2];
        expect(endNode.textNode).to.equal(targetNode);
      });
    });

    describe('Test annote03: partial-paragraph --> partial-paragraph', () => {
      const annoteLocation = locateAnnote(annote03, docText, nodes);
      const { startNode, endNode } = annoteLocation;

      it('should return an object', () => {
        expect(annoteLocation).to.be.a('object');
      });

      it('annote starting index should equal 2109', () => {
        expect(startNode.start + startNode.startOffset).to.equal(2109);
      });

      it('startNode.textNode should equal the given textNode', () => {
        targetNode = document.body.querySelector('.p3').childNodes[0];
        expect(startNode.textNode).to.equal(targetNode);
      });

      it('endNode.offset should equal 121', () => {
        expect(endNode.endOffset).to.equal(121);
      });

      it('endNode.textNode should equal the given textNode', () => {
        targetNode = document.body.querySelector('.p4').childNodes[0];
        expect(endNode.textNode).to.equal(targetNode);
      });
    });

    describe('Test annote04: whole-paragraph --> whole-paragraph', () => {
      const annoteLocation = locateAnnote(annote04, docText, nodes);
      const { startNode, endNode } = annoteLocation;

      it('should return an object', () => {
        expect(annoteLocation).to.be.a('object');
      });

      it('annote starting index should equal 3121', () => {
        expect(startNode.start + startNode.startOffset).to.equal(3121);
      });

      it('startNode.textNode should equal the given textNode', () => {
        targetNode = document.body.querySelector('.p5').childNodes[0];
        expect(startNode.textNode).to.equal(targetNode);
      });

      it('endNode.offset should equal 529', () => {
        expect(endNode.endOffset).to.equal(529);
      });

      it('endNode.textNode should equal the given textNode', () => {
        targetNode = document.body.querySelector('.p6').childNodes[0];
        expect(endNode.textNode).to.equal(targetNode);
      });
    });

    describe('Test annote05: textNode --> span --> textNode', () => {
      const annoteLocation = locateAnnote(annote05, docText, nodes);
      const { startNode, endNode } = annoteLocation;

      it('should return an object', () => {
        expect(annoteLocation).to.be.a('object');
      });

      it('annote starting index should equal 124', () => {
        expect(startNode.start + startNode.startOffset).to.equal(124);
      });

      it('startNode.textNode should equal the given textNode', () => {
        targetNode = document.body.querySelector('.p1').childNodes[0];
        expect(startNode.textNode).to.equal(targetNode);
      });

      it('endNode.offset should equal 13', () => {
        expect(endNode.endOffset).to.equal(13);
      });

      it('endNode.textNode should equal the given textNode', () => {
        targetNode = document.body.querySelector('.p1').childNodes[2];
        expect(endNode.textNode).to.equal(targetNode);
      });
    });

    describe('Test annote06: textNode --> span / end-of-paragraph', () => {
      const annoteLocation = locateAnnote(annote06, docText, nodes);
      const { startNode, endNode } = annoteLocation;

      it('should return an object', () => {
        expect(annoteLocation).to.be.a('object');
      });

      it('annote starting index should equal 548', () => {
        expect(startNode.start + startNode.startOffset).to.equal(548);
      });

      it('startNode.textNode should equal the given textNode', () => {
        targetNode = document.body.querySelector('.p1').childNodes[2];
        expect(startNode.textNode).to.equal(targetNode);
      });

      it('endNode.offset should equal 22', () => {
        expect(endNode.endOffset).to.equal(22);
      });

      it('endNode.textNode should equal the given textNode', () => {
        targetNode = document.body.querySelector('.p1').childNodes[3].childNodes[0];
        expect(endNode.textNode).to.equal(targetNode);
      });
    });
  });
});
